"use client";

import { useEffect, useRef } from "react";

type Point = [number, number];

type OrbitState = {
  angle: number;
  dir: number;
  targetDir: number;
  nextFlip: number;
  speed: number;
};

type SpinePoint = {
  x: number;
  y: number;
  nx: number;
  ny: number;
};

type ScrapState = {
  x: number;
  y: number;
  rotation: number;
  baseX: number;
  glow: number;
  pulseStart: number;
  pulseAmp: number;
};

const QUAR_SIZES = [
  120, 30, 90, 15, 150, 60, 160, 20, 110, 10, 135, 40, 100, 25, 70,
  145,
];
const QUAR_COLUMNS = 4;
const QUAR_RISE_SPEED = 100;
const QUAR_ROTATION_SPEED = 0.5;
const QUAR_SPOT_SIZE = 520;

function catmullRom(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  u: number,
): Point {
  const u2 = u * u;
  const u3 = u2 * u;

  return [
    0.5 *
      (2 * p1[0] +
        (-p0[0] + p2[0]) * u +
        (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * u2 +
        (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * u3),
    0.5 *
      (2 * p1[1] +
        (-p0[1] + p2[1]) * u +
        (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * u2 +
        (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * u3),
  ];
}

function catmullRomNormal(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  u: number,
): Point {
  const u2 = u * u;
  const dx =
    0.5 *
    ((-p0[0] + p2[0]) +
      (4 * p0[0] - 10 * p1[0] + 8 * p2[0] - 2 * p3[0]) * u +
      (-3 * p0[0] + 9 * p1[0] - 9 * p2[0] + 3 * p3[0]) * u2);
  const dy =
    0.5 *
    ((-p0[1] + p2[1]) +
      (4 * p0[1] - 10 * p1[1] + 8 * p2[1] - 2 * p3[1]) * u +
      (-3 * p0[1] + 9 * p1[1] - 9 * p2[1] + 3 * p3[1]) * u2);
  const length = Math.sqrt(dx * dx + dy * dy) || 1;

  return [-dy / length, dx / length];
}

function buildSpine(points: Point[], width: number, height: number) {
  const segments = points.length - 1;
  const stepsPerSegment = 30;
  const spine: SpinePoint[] = [];

  for (let index = 0; index < segments; index += 1) {
    const p0 = points[Math.max(0, index - 1)];
    const p1 = points[index];
    const p2 = points[Math.min(segments, index + 1)];
    const p3 = points[Math.min(segments, index + 2)];
    const count =
      index === segments - 1 ? stepsPerSegment + 1 : stepsPerSegment;

    for (let step = 0; step < count; step += 1) {
      const fraction = step / stepsPerSegment;
      const [x, y] = catmullRom(p0, p1, p2, p3, fraction);
      const [nx, ny] = catmullRomNormal(p0, p1, p2, p3, fraction);
      spine.push({ x: x * width, y: y * height, nx, ny });
    }
  }

  return spine;
}

/**
 * Source port:
 * PROJECTS/DataViz/frontend/src/components/Landing/AmbientWaves.tsx
 *
 * The ribbon geometry, colors, timing, random orbit reversals, blur, and
 * breathing widths are preserved. Viewport sizing is intentionally scoped to
 * this portfolio case-study panel.
 */
export function TalkToGreekDataBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!root || !canvas || !context) {
      return;
    }

    let animationFrame = 0;
    let time = 0;
    let isVisible = false;
    let reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const tau = Math.PI * 2;
    const randomSign = () => (Math.random() > 0.5 ? 1 : -1);
    const makeOrbit = (speed: number): OrbitState => {
      const direction = randomSign();

      return {
        angle: Math.random() * tau,
        dir: direction,
        targetDir: direction,
        nextFlip: 15 + Math.random() * 30,
        speed,
      };
    };

    const orbits = [
      makeOrbit(0.12),
      makeOrbit(0.085),
      makeOrbit(0.1),
      makeOrbit(0.095),
    ];
    const ribbonConfigs = [
      {
        breatheOffset: 0,
        colors: ["rgba(99, 102, 241, 0.4)", "rgba(6, 182, 212, 0.4)"],
      },
      {
        breatheOffset: 1.8,
        colors: ["rgba(6, 182, 212, 0.4)", "rgba(99, 102, 241, 0.4)"],
      },
    ];
    const midpointPhases = [Math.random() * tau, Math.random() * tau];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(canvas.offsetWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.offsetHeight * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const midpointFor = (index: number, currentTime: number): Point => {
      const phase = midpointPhases[index];

      if (index === 0) {
        return [
          0.5 +
            Math.sin(currentTime * 0.15 + 1 + phase) * 0.15 +
            Math.sin(currentTime * 0.09 + 3 + phase) * 0.08,
          0.5 +
            Math.sin(currentTime * 0.13 + 5 + phase) * 0.15 +
            Math.cos(currentTime * 0.1 + 2 + phase) * 0.08,
        ];
      }

      return [
        0.5 +
          Math.sin(currentTime * 0.12 + 4 + phase) * 0.15 +
          Math.cos(currentTime * 0.08 + 1.5 + phase) * 0.08,
        0.5 +
          Math.cos(currentTime * 0.11 + 2.5 + phase) * 0.15 +
          Math.sin(currentTime * 0.14 + 6 + phase) * 0.08,
      ];
    };

    const pointsFor = (ribbonIndex: number, midpoint: Point): Point[] => {
      const startOrbit = orbits[ribbonIndex * 2];
      const endOrbit = orbits[ribbonIndex * 2 + 1];
      const start: Point = [
        0.5 + Math.cos(startOrbit.angle) * 0.8,
        0.5 + Math.sin(startOrbit.angle) * 0.8,
      ];
      const end: Point = [
        0.5 + Math.cos(endOrbit.angle) * 0.8,
        0.5 + Math.sin(endOrbit.angle) * 0.8,
      ];
      const firstGhost: Point = [
        start[0] + (start[0] - midpoint[0]) * 0.5,
        start[1] + (start[1] - midpoint[1]) * 0.5,
      ];
      const secondGhost: Point = [
        end[0] + (end[0] - midpoint[0]) * 0.5,
        end[1] + (end[1] - midpoint[1]) * 0.5,
      ];

      return [firstGhost, start, midpoint, end, secondGhost];
    };

    const drawRibbon = (
      spine: SpinePoint[],
      config: (typeof ribbonConfigs)[number],
      now: number,
    ) => {
      const totalPoints = spine.length;
      const baseWidth = 80;
      const widthAt = (globalFraction: number) => {
        const taper = 0.15 + 0.85 * Math.sin(globalFraction * Math.PI);
        const breathe =
          0.5 +
          0.3 *
            Math.sin(
              now * 0.4 +
                globalFraction * 4 +
                config.breatheOffset,
            ) +
          0.15 *
            Math.sin(
              now * 0.27 +
                globalFraction * 9 +
                2 +
                config.breatheOffset,
            ) +
          0.1 *
            Math.cos(
              now * 0.35 +
                globalFraction * 6.5 +
                4 +
                config.breatheOffset,
            );

        return baseWidth * taper * breathe;
      };

      context.save();
      context.filter = "blur(40px)";
      context.beginPath();

      for (let index = 0; index < totalPoints; index += 1) {
        const fraction = index / (totalPoints - 1);
        const halfWidth = widthAt(fraction);
        const x = spine[index].x + spine[index].nx * halfWidth;
        const y = spine[index].y + spine[index].ny * halfWidth;

        if (index === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }

      for (let index = totalPoints - 1; index >= 0; index -= 1) {
        const fraction = index / (totalPoints - 1);
        const halfWidth = widthAt(fraction);
        context.lineTo(
          spine[index].x - spine[index].nx * halfWidth,
          spine[index].y - spine[index].ny * halfWidth,
        );
      }

      context.closePath();

      const start = spine[0];
      const end = spine[totalPoints - 1];
      const gradient = context.createLinearGradient(
        start.x,
        start.y,
        end.x,
        end.y,
      );
      gradient.addColorStop(0, config.colors[0]);
      gradient.addColorStop(1, config.colors[1]);
      context.fillStyle = gradient;
      context.fill();
      context.restore();
    };

    const updateOrbits = () => {
      orbits.forEach((orbit) => {
        if (time > orbit.nextFlip) {
          orbit.targetDir *= -1;
          orbit.nextFlip = time + 15 + Math.random() * 30;
        }

        orbit.dir += (orbit.targetDir - orbit.dir) * 0.008;
        orbit.angle += orbit.speed * orbit.dir * 0.015;
      });
    };

    const draw = (advance: boolean) => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      if (!width || !height) {
        return;
      }

      context.clearRect(0, 0, width, height);

      if (advance) {
        updateOrbits();
      }

      const now = performance.now() / 1000;
      ribbonConfigs.forEach((config, ribbonIndex) => {
        const midpoint = midpointFor(ribbonIndex, time);
        const spine = buildSpine(
          pointsFor(ribbonIndex, midpoint),
          width,
          height,
        );
        drawRibbon(spine, config, now);
      });
    };

    const stop = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const animate = () => {
      draw(true);
      time += 0.015;
      animationFrame = requestAnimationFrame(animate);
    };

    const syncAnimation = () => {
      const shouldAnimate =
        isVisible && !reducedMotion && document.visibilityState === "visible";

      if (!shouldAnimate) {
        stop();
        draw(false);
        return;
      }

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    resize();
    draw(false);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(false);
    });
    resizeObserver.observe(root);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncAnimation();
      },
      { rootMargin: "180px 0px" },
    );
    intersectionObserver.observe(root);

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      syncAnimation();
    };
    const onVisibilityChange = () => syncAnimation();

    motionQuery.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="flagship-backdrop talk-data-background"
      data-source-effect="dataviz-ambient-waves"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="talk-data-waves" />
      <div className="talk-data-orb talk-data-orb-1" />
      <div className="talk-data-orb talk-data-orb-2" />
      <div className="talk-data-orb talk-data-orb-3" />
      <div className="talk-data-dot-grid" />
    </div>
  );
}

const parallaxFor = (size: number) =>
  size >= 110 ? 18 : size >= 60 ? 10 : 5;

/**
 * Source port:
 * PROJECTS/QuaR/frontend/src/landing/InteractiveSquares.tsx
 *
 * It preserves the production four-column spawn, size ladder, rise/rotation
 * speeds, respawn behavior, cursor depth, amber proximity glow, spotlight, and
 * click ripple. Coordinates are scoped to the QuaR case-study panel.
 */
export function QuarBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const allScraps = Array.from(
      root.querySelectorAll<HTMLDivElement>(".quar-background-scrap"),
    );
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    let reducedMotion = reducedMotionQuery.matches;
    let isVisible = false;
    let animationFrame = 0;
    let lastTime = 0;
    let states: ScrapState[] = [];
    let scraps: HTMLDivElement[] = [];
    let glows: Array<HTMLDivElement | null> = [];
    let columnWidth = 100 / QUAR_COLUMNS;
    let targetX = root.clientWidth / 2;
    let targetY = root.clientHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let spotX = targetX;
    let spotY = targetY;
    let spotOn = 0;
    let spotTarget = 0;
    let spotPulse = 0;

    const placeStatic = () => {
      const width = root.clientWidth;
      const height = root.clientHeight;
      const count = width < 768 ? 4 : 6;

      allScraps.forEach((scrap, index) => {
        if (index >= count) {
          scrap.style.display = "none";
          return;
        }

        scrap.style.display = "block";
        const x = ((((index * 61) % 86) + 5) / 100) * width;
        const y = ((((index * 37) % 82) + 6) / 100) * height;
        scrap.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${(index * 47) % 360}deg)`;
        scrap.style.willChange = "auto";
      });

      if (spotRef.current) {
        spotRef.current.style.opacity = "0";
      }
    };

    const initialise = () => {
      const width = root.clientWidth;
      const height = root.clientHeight;
      const count = width < 768 ? 12 : 16;

      allScraps.forEach((scrap, index) => {
        scrap.style.display = index < count ? "block" : "none";
      });

      scraps = allScraps.slice(0, count);
      glows = scraps.map((scrap) =>
        scrap.querySelector<HTMLDivElement>(".quar-background-scrap-glow"),
      );

      const rows = Math.ceil(scraps.length / QUAR_COLUMNS);
      const rowHeight = (height * 2) / rows;
      columnWidth = 100 / QUAR_COLUMNS;
      states = scraps.map((scrap, index) => {
        const column = index % QUAR_COLUMNS;
        const row = Math.floor(index / QUAR_COLUMNS);
        const baseX = column * columnWidth + columnWidth / 2;
        const x = Math.max(
          5,
          Math.min(
            95,
            baseX + (Math.random() - 0.5) * columnWidth * 0.6,
          ),
        );
        const y =
          row * rowHeight -
          height * 0.5 +
          (Math.random() - 0.5) * rowHeight * 0.5;

        scrap.style.willChange = "transform";

        return {
          x,
          y,
          rotation: Math.random() * 360,
          baseX,
          glow: 0,
          pulseStart: -1,
          pulseAmp: 0,
        };
      });

      targetX = width / 2;
      targetY = height / 2;
      currentX = targetX;
      currentY = targetY;
      spotX = targetX;
      spotY = targetY;
      lastTime = 0;
    };

    const pointerPosition = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();

      return {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        inside:
          event.clientX >= bounds.left &&
          event.clientX <= bounds.right &&
          event.clientY >= bounds.top &&
          event.clientY <= bounds.bottom,
      };
    };

    const centerOf = (state: ScrapState, size: number, width: number) => ({
      x: (state.x / 100) * width + size / 2,
      y: state.y + size / 2,
    });

    const onPointerMove = (event: PointerEvent) => {
      const pointer = pointerPosition(event);
      spotTarget = pointer.inside ? 1 : 0;

      if (pointer.inside) {
        targetX = pointer.x;
        targetY = pointer.y;
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const pointer = pointerPosition(event);

      if (!pointer.inside) {
        return;
      }

      const now = performance.now();
      const width = root.clientWidth;
      states.forEach((state, index) => {
        const center = centerOf(
          state,
          QUAR_SIZES[index % QUAR_SIZES.length],
          width,
        );
        const distance = Math.hypot(
          center.x - pointer.x,
          center.y - pointer.y,
        );
        state.pulseStart = now + distance * 0.35;
        state.pulseAmp = 1 / (1 + distance / 320);
      });
      spotPulse = 1;
    };

    const stop = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const tick = (now: number) => {
      const deltaTime = Math.min(lastTime ? now - lastTime : 16.67, 50);
      lastTime = now;

      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      spotX += (targetX - spotX) * 0.05;
      spotY += (targetY - spotY) * 0.05;
      spotOn += (spotTarget - spotOn) * 0.04;
      spotPulse *= 0.94;

      const width = root.clientWidth || 1;
      const height = root.clientHeight || 1;
      const normalisedX = (currentX / width) * 2 - 1;
      const normalisedY = (currentY / height) * 2 - 1;

      states.forEach((state, index) => {
        const size = QUAR_SIZES[index % QUAR_SIZES.length];
        state.y -= (QUAR_RISE_SPEED * deltaTime) / 1000;
        state.rotation =
          (state.rotation +
            QUAR_ROTATION_SPEED * (deltaTime / 16.67)) %
          360;

        if (state.y <= -200) {
          state.x = Math.max(
            5,
            Math.min(
              95,
              state.baseX +
                (Math.random() - 0.5) * columnWidth * 0.6,
            ),
          );
          state.y = height + Math.random() * height * 0.5;
          state.rotation = Math.random() * 360;
        }

        const center = centerOf(state, size, width);
        const distance = Math.hypot(
          center.x - currentX,
          center.y - currentY,
        );
        const glowTarget = finePointerQuery.matches
          ? Math.max(0, 1 - distance / 200)
          : 0;
        state.glow += (glowTarget - state.glow) * 0.12;

        let pulse = 0;

        if (state.pulseStart >= 0) {
          const elapsed = now - state.pulseStart;

          if (elapsed > 700) {
            state.pulseStart = -1;
          } else if (elapsed >= 0) {
            pulse =
              Math.sin((elapsed / 700) * Math.PI) * state.pulseAmp;
          }
        }

        const parallax = parallaxFor(size);
        const xPixels =
          (state.x / 100) * width + normalisedX * parallax;
        const yPixels = state.y + normalisedY * parallax;
        const scale = 1 + state.glow * 0.06 + pulse * 0.1;

        scraps[index].style.transform =
          `translate3d(${xPixels.toFixed(2)}px, ${yPixels.toFixed(2)}px, 0) ` +
          `rotate(${state.rotation.toFixed(2)}deg) scale(${scale.toFixed(3)})`;

        const glow = glows[index];

        if (glow) {
          glow.style.opacity = Math.min(
            0.9,
            state.glow + pulse * 0.6,
          ).toFixed(3);
        }
      });

      const spot = spotRef.current;

      if (spot) {
        spot.style.transform =
          `translate3d(${(spotX - QUAR_SPOT_SIZE / 2).toFixed(1)}px, ` +
          `${(spotY - QUAR_SPOT_SIZE / 2).toFixed(1)}px, 0) ` +
          `scale(${(1 + spotPulse * 0.15).toFixed(3)})`;
        spot.style.opacity = (spotOn * 0.9).toFixed(3);
      }

      animationFrame = requestAnimationFrame(tick);
    };

    const syncAnimation = () => {
      const shouldAnimate =
        isVisible &&
        !reducedMotion &&
        document.visibilityState === "visible";

      if (!shouldAnimate) {
        stop();

        if (reducedMotion) {
          placeStatic();
        }

        return;
      }

      if (!states.length) {
        initialise();
      }

      if (!animationFrame) {
        lastTime = 0;
        animationFrame = requestAnimationFrame(tick);
      }
    };

    if (reducedMotion) {
      placeStatic();
    } else {
      initialise();
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncAnimation();
      },
      { rootMargin: "180px 0px" },
    );
    intersectionObserver.observe(root);

    const resizeObserver = new ResizeObserver(() => {
      if (reducedMotion) {
        placeStatic();
      }
    });
    resizeObserver.observe(root);

    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      states = [];

      if (!reducedMotion) {
        initialise();
      }

      syncAnimation();
    };
    const onVisibilityChange = () => syncAnimation();

    if (finePointerQuery.matches) {
      window.addEventListener("pointermove", onPointerMove, {
        passive: true,
      });
    }
    window.addEventListener("pointerdown", onPointerDown, {
      passive: true,
    });
    reducedMotionQuery.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      reducedMotionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange,
      );
      allScraps.forEach((scrap) => {
        scrap.style.willChange = "auto";
      });
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="flagship-backdrop quar-background"
      data-source-effect="quar-interactive-squares"
      aria-hidden="true"
    >
      <div ref={spotRef} className="quar-background-spot" />
      {QUAR_SIZES.map((size, index) => (
        <div
          key={`${size}-${index}`}
          className="quar-background-scrap"
          style={{
            width: size,
            height: size,
            transform: `translate3d(${((index * 61) % 86) + 5}vw, ${((index * 37) % 82) + 6}vh, 0) rotate(${(index * 47) % 360}deg)`,
          }}
        >
          <div className="quar-background-scrap-glow" />
        </div>
      ))}
    </div>
  );
}
