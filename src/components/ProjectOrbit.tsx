"use client";

import Image from "next/image";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  BoxGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  Texture,
} from "three";

export interface OrbitProject {
  id: string;
  title: string;
  signal: string;
  proof: string;
  metrics: string[];
  href: string;
  action: string;
  accent: string;
  texture?: string;
  kind: "screen" | "data" | "document";
}

type OrbitMode = "static" | "loading" | "full" | "reduced";

interface SceneController {
  dispose: () => void;
  focus: (index: number) => void;
  setPaused: (paused: boolean) => void;
}

interface SceneBody {
  geometry: BoxGeometry;
  mesh: Mesh<BoxGeometry, MeshStandardMaterial[]>;
  materials: MeshStandardMaterial[];
  edge: LineSegments;
  edgeMaterial: LineBasicMaterial;
  ownedTextures: Texture[];
}

type ThreeModule = typeof import("three");

const TAU = Math.PI * 2;

function wrapAngle(value: number) {
  let angle = value;

  while (angle > Math.PI) angle -= TAU;
  while (angle < -Math.PI) angle += TAU;

  return angle;
}

function nearestPhase(index: number, current: number, step: number) {
  const base = -index * step;
  return base + Math.round((current - base) / TAU) * TAU;
}

function damp(current: number, target: number, smoothing: number, delta: number) {
  return current + (target - current) * (1 - Math.exp(-smoothing * delta));
}

function createProofTexture(
  THREE: ThreeModule,
  project: OrbitProject,
  width = project.kind === "document" ? 720 : 1120,
  height = project.kind === "document" ? 960 : 700,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Project Orbit could not create a proof texture.");
  }

  const isDocument = project.kind === "document";
  context.fillStyle = isDocument ? "#f2efe4" : "#0b1511";
  context.fillRect(0, 0, width, height);

  if (!isDocument) {
    context.strokeStyle = "rgba(235, 238, 224, 0.09)";
    context.lineWidth = 1;

    for (let x = 48; x < width; x += 72) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }

    for (let y = 42; y < height; y += 72) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
  }

  context.fillStyle = project.accent;
  context.fillRect(54, 54, isDocument ? 8 : 118, isDocument ? 150 : 8);

  context.font = `700 ${isDocument ? 22 : 20}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  context.letterSpacing = "3px";
  context.fillStyle = isDocument ? "#536057" : "rgba(244, 242, 232, 0.6)";
  context.fillText(
    isDocument ? "CURRICULUM VITAE / 2026" : project.signal.toUpperCase(),
    isDocument ? 92 : 54,
    isDocument ? 82 : 116,
  );

  context.letterSpacing = "0px";
  context.font = `400 ${isDocument ? 58 : 72}px Georgia, "Times New Roman", serif`;
  context.fillStyle = isDocument ? "#101c17" : "#f4f2e8";

  const titleLines =
    project.title === "TrackSights"
      ? ["DATA", "PIPELINE"]
      : project.title === "Curriculum Vitae"
        ? ["Dimosthenis", "Gkontolias"]
        : [project.title];

  titleLines.forEach((line, index) => {
    context.fillText(line, isDocument ? 92 : 54, (isDocument ? 190 : 220) + index * 78);
  });

  const metricY = isDocument ? 430 : 470;
  project.metrics.slice(0, 4).forEach((metric, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const x = (isDocument ? 92 : 54) + column * (isDocument ? 285 : 500);
    const y = metricY + row * 112;

    context.font = `700 ${isDocument ? 21 : 25}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    context.fillStyle = project.accent;
    context.fillText(String(index + 1).padStart(2, "0"), x, y);
    context.font = `650 ${isDocument ? 23 : 26}px Arial, sans-serif`;
    context.fillStyle = isDocument ? "#24332b" : "#f4f2e8";
    context.fillText(metric, x + 52, y);
  });

  context.strokeStyle = isDocument ? "rgba(16, 28, 23, 0.2)" : "rgba(244, 242, 232, 0.18)";
  context.beginPath();
  context.moveTo(isDocument ? 92 : 54, height - 108);
  context.lineTo(width - (isDocument ? 92 : 54), height - 108);
  context.stroke();

  context.font = `700 ${isDocument ? 18 : 17}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  context.letterSpacing = "2px";
  context.fillStyle = isDocument ? "#536057" : "rgba(244, 242, 232, 0.55)";
  context.fillText(
    isDocument ? "AI SOFTWARE ENGINEER · ATHENS" : "PROOF / INSPECTABLE SYSTEM",
    isDocument ? 92 : 54,
    height - 62,
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function createOrbitLine(
  THREE: ThreeModule,
  radiusX: number,
  radiusY: number,
  radiusZ: number,
  color: number,
  opacity: number,
) {
  const points = Array.from({ length: 144 }, (_, index) => {
    const angle = (index / 144) * TAU;
    return new THREE.Vector3(
      Math.sin(angle) * radiusX,
      Math.sin(angle * 2) * radiusY,
      Math.cos(angle) * radiusZ,
    );
  });
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    opacity,
    transparent: true,
  });
  const line = new THREE.LineLoop(geometry, material);

  return { geometry, material, line };
}

async function createScene({
  canvas,
  root,
  projects,
  tier,
  initialIndex,
  onSelect,
  onReady,
  onFallback,
}: {
  canvas: HTMLCanvasElement;
  root: HTMLElement;
  projects: OrbitProject[];
  tier: "full" | "reduced";
  initialIndex: number;
  onSelect: (index: number) => void;
  onReady: () => void;
  onFallback: () => void;
}): Promise<SceneController> {
  const THREE = await import("three");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: tier === "full",
    powerPreference: tier === "full" ? "high-performance" : "low-power",
  });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60);
  const orbitRig = new THREE.Group();
  const radiusX = tier === "full" ? 3.7 : 3.25;
  const radiusY = tier === "full" ? 1.06 : 0.82;
  const radiusZ = tier === "full" ? 2.45 : 2.05;
  const step = TAU / projects.length;
  const maxDpr = tier === "full" ? 1.5 : 1;
  const targetFrameDuration = tier === "full" ? 1000 / 60 : 1000 / 36;
  const bodies: SceneBody[] = [];
  const textureLoader = new THREE.TextureLoader();
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  const pointerCurrent = new THREE.Vector2();
  const viewport = { width: 1, height: 1 };
  let activeIndex = initialIndex;
  let phase = nearestPhase(initialIndex, 0, step);
  let targetPhase = phase;
  let paused = false;
  let visible = true;
  let disposed = false;
  let contextLost = false;
  let raf = 0;
  let lastFrame = performance.now();
  let lastRenderedAt = 0;
  let scrollProgress = 0;
  let pointerDown = false;
  let horizontalGesture = false;
  let verticalGesture = false;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let pointerStartPhase = 0;
  let pointerTravel = 0;

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.setClearColor(0x08110d, 0);
  scene.add(orbitRig);
  camera.position.set(0, 0.12, 9.2);

  const ambient = new THREE.AmbientLight(0xf1ead9, 1.55);
  const key = new THREE.DirectionalLight(0xffedc4, 3.2);
  const fill = new THREE.PointLight(0x6ec9dc, 7.5, 13);
  const rim = new THREE.PointLight(0xd8ed75, 5.5, 11);
  key.position.set(-4, 5, 6);
  fill.position.set(4.5, -1, 4);
  rim.position.set(-3.5, 1.5, -3);
  scene.add(ambient, key, fill, rim);

  const orbitPrimary = createOrbitLine(
    THREE,
    radiusX,
    radiusY,
    radiusZ,
    0xd8ed75,
    0.34,
  );
  const orbitSecondary = createOrbitLine(
    THREE,
    radiusX * 1.08,
    radiusY * 0.82,
    radiusZ * 1.08,
    0xf2efe4,
    0.1,
  );
  orbitSecondary.line.rotation.z = 0.13;
  orbitRig.add(orbitPrimary.line, orbitSecondary.line);

  if (tier === "full") {
    const markerPositions: number[] = [];

    for (let index = 0; index < 42; index += 1) {
      const angle = (index / 42) * TAU;
      markerPositions.push(
        Math.sin(angle) * (radiusX + Math.sin(index * 1.7) * 0.45),
        Math.sin(angle * 2) * (radiusY + 0.18),
        Math.cos(angle) * (radiusZ + Math.cos(index * 1.1) * 0.32),
      );
    }

    const markerGeometry = new THREE.BufferGeometry();
    markerGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(markerPositions, 3),
    );
    const markerMaterial = new THREE.PointsMaterial({
      color: 0xf4f2e8,
      opacity: 0.28,
      size: 0.027,
      sizeAttenuation: true,
      transparent: true,
    });
    const markers = new THREE.Points(markerGeometry, markerMaterial);
    orbitRig.add(markers);
  }

  const dimensions = [
    [3.6, 2.25],
    [3.4, 2.125],
    [3.1, 1.94],
    [3, 1.875],
    [2.2, 2.9],
  ];

  projects.forEach((project, index) => {
    const [width, height] = dimensions[index] ?? [3, 1.9];
    const geometry = new THREE.BoxGeometry(width, height, 0.075, 1, 1, 1);
    const baseTexture = createProofTexture(THREE, project);
    const accent = new THREE.Color(project.accent);
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x17231d,
      metalness: 0.08,
      roughness: 0.55,
    });
    const frontMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: accent,
      emissiveIntensity: project.kind === "screen" ? 0.055 : 0.025,
      map: baseTexture,
      metalness: 0.02,
      roughness: 0.7,
    });
    const backMaterial = new THREE.MeshStandardMaterial({
      color: accent.clone().multiplyScalar(0.37),
      emissive: accent,
      emissiveIntensity: 0.045,
      metalness: 0.06,
      roughness: 0.72,
    });
    const materials = [
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      frontMaterial,
      backMaterial,
    ];
    const mesh = new THREE.Mesh(geometry, materials);
    const outlineGeometry = new THREE.EdgesGeometry(geometry);
    const outlineMaterial = new THREE.LineBasicMaterial({
      color: accent,
      opacity: index === initialIndex ? 0.86 : 0.2,
      transparent: true,
    });
    const outline = new THREE.LineSegments(outlineGeometry, outlineMaterial);
    mesh.add(outline);
    mesh.userData.orbitIndex = index;
    orbitRig.add(mesh);

    bodies.push({
      geometry,
      mesh,
      materials,
      edge: outline,
      edgeMaterial: outlineMaterial,
      ownedTextures: [baseTexture],
    });

    if (project.texture) {
      textureLoader.load(
        project.texture,
        (texture) => {
          if (disposed) {
            texture.dispose();
            return;
          }

          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
          frontMaterial.map = texture;
          frontMaterial.needsUpdate = true;
          bodies[index]?.ownedTextures.push(texture);
          start();
        },
        undefined,
        () => {
          start();
        },
      );
    }
  });

  function resize() {
    const rect = canvas.getBoundingClientRect();
    viewport.width = Math.max(1, rect.width);
    viewport.height = Math.max(1, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    renderer.setSize(viewport.width, viewport.height, false);
    camera.aspect = viewport.width / viewport.height;
    camera.fov = viewport.width < 720 ? 45 : viewport.width < 1100 ? 40 : 35;
    camera.updateProjectionMatrix();
    start();
  }

  function updateScroll() {
    const hero = root.closest<HTMLElement>(".orbit-hero");

    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const travel = Math.max(hero.offsetHeight - window.innerHeight, 1);
    scrollProgress = Math.min(1, Math.max(0, -rect.top / travel));
    start();
  }

  function renderFrame(time: number) {
    raf = 0;

    if (disposed || contextLost || !visible || document.hidden) {
      return;
    }

    if (time - lastRenderedAt < targetFrameDuration) {
      raf = requestAnimationFrame(renderFrame);
      return;
    }

    const delta = Math.min((time - lastFrame) / 1000, 0.05);
    lastFrame = time;
    lastRenderedAt = time;

    const ambientDrift = paused ? 0 : Math.sin(time * 0.00022) * 0.075;
    phase = damp(phase, targetPhase + ambientDrift, 4.6, delta);
    pointerCurrent.x = damp(pointerCurrent.x, paused ? 0 : pointerTarget.x, 3.8, delta);
    pointerCurrent.y = damp(pointerCurrent.y, paused ? 0 : pointerTarget.y, 3.8, delta);

    camera.position.x = pointerCurrent.x * 0.46;
    camera.position.y = 0.12 + pointerCurrent.y * 0.3 - scrollProgress * 0.08;
    camera.position.z = 9.2 - scrollProgress * 0.62;
    camera.lookAt(0, 0, 0);

    orbitRig.rotation.x = -0.115 + pointerCurrent.y * 0.025;
    orbitRig.rotation.z = scrollProgress * -0.035;

    bodies.forEach((body, index) => {
      const angle = phase + index * step;
      const isActive = index === activeIndex;
      const depth = Math.cos(angle);
      const bob = paused ? 0 : Math.sin(time * 0.0008 + index * 1.73) * 0.055;
      const focusLift = isActive ? scrollProgress * 0.22 : 0;
      const targetScale = isActive ? 1.08 + scrollProgress * 0.035 : 0.91 + (depth + 1) * 0.035;

      body.mesh.position.set(
        Math.sin(angle) * radiusX,
        Math.sin(angle * 2) * radiusY + bob + focusLift,
        Math.cos(angle) * radiusZ,
      );
      body.mesh.lookAt(camera.position);
      body.mesh.rotateZ(Math.sin(angle) * 0.035);
      const currentScale = body.mesh.scale.x;
      const scale = damp(currentScale, targetScale, 5.5, delta);
      body.mesh.scale.setScalar(scale);
      body.edgeMaterial.opacity = damp(
        body.edgeMaterial.opacity,
        isActive ? 0.9 : 0.16 + Math.max(depth, 0) * 0.14,
        6,
        delta,
      );
      body.edgeMaterial.needsUpdate = true;

      body.materials[4].emissiveIntensity = damp(
        body.materials[4].emissiveIntensity,
        isActive ? 0.085 : 0.035,
        5,
        delta,
      );
    });

    orbitPrimary.line.rotation.y = paused ? 0 : time * 0.000015;
    orbitSecondary.line.rotation.y = paused ? 0 : -time * 0.000012;
    renderer.render(scene, camera);

    const phaseSettled = Math.abs(wrapAngle(targetPhase - phase)) < 0.0015;
    const pointerSettled =
      Math.abs(pointerCurrent.x - (paused ? 0 : pointerTarget.x)) < 0.002 &&
      Math.abs(pointerCurrent.y - (paused ? 0 : pointerTarget.y)) < 0.002;

    if (!paused || !phaseSettled || !pointerSettled) {
      raf = requestAnimationFrame(renderFrame);
    }
  }

  function start() {
    if (disposed || contextLost || raf || !visible || document.hidden) return;
    lastFrame = performance.now();
    raf = requestAnimationFrame(renderFrame);
  }

  function focus(index: number) {
    activeIndex = index;
    targetPhase = nearestPhase(index, targetPhase, step);
    start();
  }

  function selectNearest() {
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    projects.forEach((_, index) => {
      const distance = Math.abs(wrapAngle(targetPhase + index * step));

      if (distance < nearestDistance) {
        nearest = index;
        nearestDistance = distance;
      }
    });

    onSelect(nearest);
    focus(nearest);
  }

  function updatePointerNdc(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    pointerNdc.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function onPointerDown(event: PointerEvent) {
    if (paused) return;
    pointerDown = true;
    horizontalGesture = false;
    verticalGesture = false;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    pointerStartPhase = targetPhase;
    pointerTravel = 0;
    canvas.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    pointerTarget.x = Math.min(1, Math.max(-1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
    pointerTarget.y = Math.min(1, Math.max(-1, -(((event.clientY - rect.top) / rect.height) * 2 - 1)));

    if (!pointerDown || paused) {
      updatePointerNdc(event);
      raycaster.setFromCamera(pointerNdc, camera);
      canvas.dataset.hovering =
        raycaster.intersectObjects(bodies.map((body) => body.mesh), false).length > 0
          ? "true"
          : "false";
      start();
      return;
    }

    const deltaX = event.clientX - pointerStartX;
    const deltaY = event.clientY - pointerStartY;
    pointerTravel = Math.max(pointerTravel, Math.hypot(deltaX, deltaY));

    if (!horizontalGesture && !verticalGesture) {
      if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        horizontalGesture = true;
      } else if (Math.abs(deltaY) > 8) {
        verticalGesture = true;
      }
    }

    if (horizontalGesture) {
      event.preventDefault();
      targetPhase = pointerStartPhase + deltaX * 0.006;
      start();
    }
  }

  function onPointerUp(event: PointerEvent) {
    if (!pointerDown) return;
    pointerDown = false;

    if (canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }

    if (horizontalGesture) {
      selectNearest();
      return;
    }

    if (!verticalGesture && pointerTravel < 8) {
      updatePointerNdc(event);
      raycaster.setFromCamera(pointerNdc, camera);
      const hit = raycaster.intersectObjects(
        bodies.map((body) => body.mesh),
        false,
      )[0];

      if (hit) {
        const index = Number(hit.object.userData.orbitIndex);
        onSelect(index);
        focus(index);
      }
    }
  }

  function onPointerLeave() {
    pointerTarget.set(0, 0);
    canvas.dataset.hovering = "false";
    start();
  }

  function onContextLost(event: Event) {
    event.preventDefault();
    contextLost = true;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    onFallback();
  }

  function onVisibilityChange() {
    if (document.hidden) {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    } else {
      start();
    }
  }

  const resizeObserver = new ResizeObserver(resize);
  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;

      if (visible) {
        start();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    { threshold: 0.02 },
  );

  resizeObserver.observe(root);
  intersectionObserver.observe(root);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);
  canvas.addEventListener("pointerleave", onPointerLeave);
  canvas.addEventListener("webglcontextlost", onContextLost);
  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("scroll", updateScroll, { passive: true });
  resize();
  updateScroll();
  renderer.render(scene, camera);
  onReady();
  start();

  return {
    focus,
    setPaused(nextPaused) {
      paused = nextPaused;
      start();
    },
    dispose() {
      disposed = true;

      if (raf) cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", updateScroll);

      bodies.forEach((body) => {
        body.geometry.dispose();
        body.edge.geometry.dispose();
        body.edgeMaterial.dispose();
        body.materials.forEach((material) => material.dispose());
        body.ownedTextures.forEach((texture) => texture.dispose());
      });
      orbitPrimary.geometry.dispose();
      orbitPrimary.material.dispose();
      orbitSecondary.geometry.dispose();
      orbitSecondary.material.dispose();
      renderer.dispose();
    },
  };
}

export function ProjectOrbit({ projects }: { projects: OrbitProject[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<OrbitMode>("static");
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<SceneController | null>(null);
  const onSelectRef = useRef<(index: number) => void>(() => undefined);
  const activeProject = projects[activeIndex] ?? projects[0];

  const selectProject = useCallback(
    (index: number) => {
      setActiveIndex(index);
      controllerRef.current?.focus(index);
    },
    [],
  );

  onSelectRef.current = selectProject;

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;

    if (!root || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const forcedColors = window.matchMedia("(forced-colors: active)").matches;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    const saveData = nav.connection?.saveData === true;
    const smallViewport = window.innerWidth < 768;
    const webglAvailable = Boolean(
      document.createElement("canvas").getContext("webgl2") ||
        document.createElement("canvas").getContext("webgl"),
    );

    if (
      reducedMotion ||
      forcedColors ||
      saveData ||
      smallViewport ||
      !webglAvailable
    ) {
      setMode("static");
      return;
    }

    const reducedTier =
      (nav.hardwareConcurrency ?? 8) <= 4 ||
      (nav.deviceMemory ?? 8) <= 4;
    const tier = reducedTier ? "reduced" : "full";
    let disposed = false;
    setMode("loading");

    void createScene({
      canvas,
      root,
      projects,
      tier,
      initialIndex: activeIndex,
      onSelect(index) {
        onSelectRef.current(index);
      },
      onReady() {
        if (!disposed) setMode(tier);
      },
      onFallback() {
        if (!disposed) setMode("static");
      },
    })
      .then((controller) => {
        if (disposed) {
          controller.dispose();
          return;
        }

        controllerRef.current = controller;
      })
      .catch(() => {
        if (!disposed) setMode("static");
      });

    return () => {
      disposed = true;
      controllerRef.current?.dispose();
      controllerRef.current = null;
    };
    // The scene is intentionally initialized once for the stable project set.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    controllerRef.current?.setPaused(paused);
  }, [paused]);

  if (!activeProject) return null;

  return (
    <div
      ref={rootRef}
      className="project-orbit"
      data-orbit-root
      data-orbit-mode={mode}
      data-orbit-state={paused ? "paused" : "active"}
    >
      <div className="orbit-stage" aria-hidden="true">
        <div className="orbit-fallback-stack" data-orbit-fallback>
          <div className="orbit-fallback-card orbit-fallback-talk">
            <Image
              src="/images/projects/dataviz.webp"
              alt=""
              fill
              sizes="(max-width: 767px) 78vw, 40vw"
              priority
            />
          </div>
          <div className="orbit-fallback-card orbit-fallback-quar">
            <Image
              src="/images/projects/quar.webp"
              alt=""
              fill
              sizes="(max-width: 767px) 68vw, 34vw"
              priority
            />
          </div>
          <div className="orbit-fallback-card orbit-fallback-data">
            <span>03 / DATA PIPELINE</span>
            <strong>785k</strong>
            <small>listings · 71 features · R² 0.946</small>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className="orbit-canvas"
          data-orbit-canvas
          data-hovering="false"
        />
        <div className="orbit-depth-label orbit-depth-label-a">Z / +2.45</div>
        <div className="orbit-depth-label orbit-depth-label-b">
          {projects.length} projects / drag to explore
        </div>
      </div>

      <div className="orbit-interface">
        <div className="orbit-selector" data-orbit-selector aria-label="Project orbit">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className="orbit-selector-item focus-ring"
              data-orbit-project={project.id}
              aria-pressed={activeIndex === index}
              onClick={() => selectProject(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {project.title}
            </button>
          ))}
        </div>

        <div className="orbit-proof" aria-live="polite">
          <div className="orbit-proof-heading">
            <span style={{ color: activeProject.accent }}>
              {String(activeIndex + 1).padStart(2, "0")} / {activeProject.signal}
            </span>
            <button
              type="button"
              className="orbit-pause focus-ring"
              data-orbit-pause
              aria-pressed={paused}
              onClick={() => setPaused((current) => !current)}
              disabled={mode === "static" || mode === "loading"}
            >
              {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
              {paused ? "Resume motion" : "Pause motion"}
            </button>
          </div>
          <h2>{activeProject.title}</h2>
          <p>{activeProject.proof}</p>
          <div className="orbit-proof-footer">
            <ul aria-label={`${activeProject.title} proof metrics`}>
              {activeProject.metrics.map((metric) => (
                <li key={metric}>{metric}</li>
              ))}
            </ul>
            <a
              href={activeProject.href}
              target={
                activeProject.href.startsWith("http") ? "_blank" : undefined
              }
              rel={
                activeProject.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="orbit-action focus-ring"
            >
              {activeProject.action}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
