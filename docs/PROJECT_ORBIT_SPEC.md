# Project Orbit — Spatial and Interaction Specification

## 1. Purpose

Project Orbit is the signature interaction of the portfolio. It transforms real project evidence into a bounded 3D inspection system. It must create immediate presence while keeping the recruiter journey faster and clearer than a conventional portfolio grid.

## 2. Technical architecture

### Server layer

`src/app/page.tsx` owns:

- semantic H1 and positioning copy;
- primary and secondary actions;
- semantic project selector and proof panel;
- static fallback markup;
- all project links and the inline CV preview;
- structured content passed as minimal serializable objects.

### Client layer

`src/components/ProjectOrbit.tsx` owns:

- capability detection;
- active-project state;
- pause state;
- pointer/touch/keyboard coordination;
- dynamic Three.js loading;
- WebGL lifecycle and context recovery;
- synchronization between DOM selector and 3D body focus.

### Scene layer

`src/lib/project-orbit-scene.ts` owns:

- renderer, scene, camera, group, lights, and meshes;
- texture loading and generated canvas textures;
- orbit math, damping, focus interpolation, and raycasting;
- resize and DPR updates;
- disposal of geometry, materials, textures, listeners, and animation frames.

Three.js is imported dynamically only inside the desktop/tablet client enhancement path. Viewports below 768px use the art-directed fallback and do not download the runtime. React does not rerender per frame.

## 3. Scene graph

```text
Scene
├── CameraRig
│   └── PerspectiveCamera
├── OrbitRig
│   ├── OrbitTracePrimary
│   ├── OrbitTraceSecondary
│   ├── TalkToGreekDataBody
│   ├── QuarBody
│   ├── TrackSightsBody
│   └── DemosVibesBody
├── SparseDepthMarkers
├── KeyLight
├── FillLight
└── RimLight
```

No decorative model is added unless it clarifies focus or depth.

## 4. Body specification

Each body is a shallow rectangular project plane with:

- front surface: real screenshot or generated verified proof texture;
- back surface: project index, role signal, status, and accent;
- edge material: matte dark or warm neutral;
- focus outline: project-specific accent plus Signal Acid focus marker;
- shadow/depth cue: restrained and directional;
- stable body ID matching the semantic DOM control.

Suggested initial dimensions:

- TalkToGreekData: 3.6 × 2.25 units.
- Quar: 3.4 × 2.125 units.
- TrackSights: 3.1 × 1.94 units.
- Demos Vibes: 3.0 × 1.875 units.

The difference in size communicates hierarchy without removing any route.

## 5. Orbit geometry

- Elliptical radius X: approximately 3.7 units.
- Radius Y: approximately 1.15 units.
- Depth radius Z: approximately 2.5 units.
- Orbit rig tilt X: approximately -7 degrees.
- Initial front project: TalkToGreekData.
- Initial second-visible project: Quar.
- Project order: TalkToGreekData → Quar → TrackSights → Demos Vibes.
- Bodies face generally toward the camera while retaining a small orbital tangent angle.
- Back bodies reduce apparent contrast and scale through real perspective, not opacity disappearance.

All values remain responsive scene tokens rather than scattered constants.

## 6. Camera and lighting grammar

### Camera

- Perspective field of view: approximately 32–38 degrees.
- Desktop position: near `[0, 0.15, 9]`.
- Mobile field of view opens slightly to avoid cropping.
- Pointer parallax maximum: approximately 4 degrees X and 7 degrees Y.
- Scroll dolly maximum: approximately 0.7 scene units.
- Focus state moves the selected body, not the entire user viewpoint, to reduce discomfort.

### Lighting

- Warm key from upper left.
- Cool, low-intensity fill from the TalkToGreekData side.
- Soft rim to separate rear bodies from the ink field.
- Screens remain readable through a restrained emissive contribution.
- No bloom or neon halo pipeline in the initial release.

## 7. Generated textures

### TrackSights

A local `CanvasTexture` presents:

- `785k listings`
- `71 features`
- `8 European markets`
- `R² 0.946`
- a restrained schematic of provider → schema → GCS → BigQuery/Dataform → model

Generated texture typography must use safe loaded/fallback fonts and be redrawn only when required, not per frame.

## 8. State machine

```text
SSR_FALLBACK
  └── capability pass → LOADING
        ├── success → ASSEMBLING
        │   └── complete → IDLE
        └── failure → STATIC

IDLE
  ├── pointer move → PARALLAX
  ├── horizontal drag → MANUAL_ORBIT
  ├── project select/focus → MAGNETIZING
  ├── pause → PAUSED
  ├── hero leaves viewport → SUSPENDED
  └── context loss → STATIC

MAGNETIZING
  └── settled → INSPECTING

INSPECTING
  ├── select another → MAGNETIZING
  ├── activate → NAVIGATING
  └── release → IDLE
```

State transitions use damped interpolation rather than abrupt CSS timing.

## 9. Motion choreography

### Assembly

- Essential DOM is already visible.
- Bodies begin as a compact depth stack.
- Over approximately 1.1–1.4 seconds, they separate into the orbit.
- The movement uses translation, rotation, and scale; essential text does not fade from invisible.
- TalkToGreekData settles first, followed by Quar and remaining bodies.

### Idle

- One full revolution target: approximately 28–36 seconds.
- The orbit pauses on any intentional interaction.
- Sparse depth markers move more slowly than the project bodies.

### Selection

- Selected body follows the shortest orbital route to the inspection position.
- Other bodies move back and reduce visual competition.
- DOM proof changes near the start of movement and announces the active project through normal focus context, not a noisy live region.
- Settling duration: approximately 550–750ms depending on angular distance.

### Hero exit

- Standard scroll progresses the camera and orbit by a limited amount.
- TalkToGreekData aligns with the visual entry of its case study.
- The canvas yields to the normal document without pinning the user indefinitely.

## 10. Input behavior

### Pointer

- Move: bounded parallax.
- Drag: horizontal orbit rotation with velocity damping.
- Click project body: synchronize semantic selection, then focus proof/action controls.
- Cursor changes only over an actionable body.

### Touch

- Horizontal intent threshold before orbit capture.
- Vertical movement remains page scroll.
- Release applies a short inertial continuation with a strict maximum.
- No multi-touch requirement.

### Keyboard

- The canvas itself is not the only control.
- A visible tablist-like project selector uses buttons with correct selected state.
- Left/Right changes selection only within the selector.
- Enter follows the project’s primary action.
- Tab order remains heading → CV → work action → project selector → selected project action.

## 11. Pause and lifecycle

The render loop pauses when:

- pause control is active;
- document visibility is hidden;
- hero intersection is below the chosen threshold;
- reduced-motion or static mode is active;
- WebGL context is lost.

The component disposes:

- RAF;
- observers;
- media-query listeners;
- pointer listeners;
- geometries;
- materials;
- textures;
- renderer and canvas references.

## 12. Fallback composition

The static composition is intentionally art-directed:

- TalkToGreekData front and center.
- Quar offset behind it on the opposite angle.
- TrackSights proof panel as a narrow technical plane.
- Demos Vibes as a cropped background plane.
- The real portrait as a separate soft-edged HTML layer above the project field.
- DOM project selector remains identical.

It must not look like an error state or a pile of ordinary cards.

## 13. Case-study continuation

### TalkToGreekData

- Light/cool data field using the source project’s actual `AmbientWaves` canvas.
- Two blurred indigo/cyan Catmull-Rom ribbons retain the source breathing, orbit, random direction reversal, and timing logic.
- The source light-theme orbs and 24 px dot grid complete the background layer.
- The canvas is dynamically loaded below the fold, sampled at 24fps, and internally rendered at 0.75 desktop / 0.70 constrained scale; delta-time correction preserves the source motion speed.
- Screenshot transitions from orbit angle to a stable inspection plane.
- Recruiter signal, role, verified metrics, architecture, and live action appear around the interface.
- The source canvas is decorative, section-scoped, visibility-suspended, and static under reduced motion; it is not presented as live product output.

### Quar

- Warm paper/orange material field.
- The source project’s actual `InteractiveSquares` implementation supplies the rising “ice” squares: the 16 production sizes, four-column distribution, 100 px/s ascent, 0.5-degree frame-normalized rotation, and below-fold respawn are preserved.
- Fine pointers retain the source depth parallax, proximity glow, warm spotlight, and radiating pointer-down pulse.
- Idle ascent uses a 30fps update budget; capable fine-pointer interaction temporarily promotes the loop to 60fps. Cached section dimensions remove layout reads from the frame loop.
- Screenshot resolves into a dimensional phone/menu composition.
- Founder responsibilities, production usage, admin capabilities, and live/GitHub actions remain inspectable.
- The animation pauses offscreen/when the tab is hidden; reduced motion uses the source deterministic calm scatter with no spotlight.

### Supporting proof

- TrackSights uses a pipeline path.
- Demos Vibes uses an editorial content rail.
- Remaining projects use a compact evidence index rather than large repeated cards.

## 14. QA hooks

Recommended stable hooks:

- `[data-orbit-root]`
- `[data-orbit-canvas]`
- `[data-orbit-mode="full|reduced|static"]`
- `[data-orbit-state]`
- `[data-orbit-project]`
- `[data-source-effect="dataviz-ambient-waves"]`
- `[data-source-effect="quar-interactive-squares"]`
- `[data-effect-loader="talktogreekdata|quar"]`
- `[data-orbit-selector]`
- `[data-orbit-pause]`
- `[data-orbit-fallback]`

Automated tests can assert state and behavior without depending on WebGL pixels alone.

## 15. Acceptance thresholds

- Essential hero and CV action exist before hydration.
- Full mode reaches idle without console errors.
- Static mode exposes identical project names and destinations.
- Continuous rendering stops offscreen.
- Reduced motion never starts autonomous rotation.
- Touch vertical scrolling remains usable.
- Keyboard selection changes the active semantic proof.
- Context loss produces a usable fallback.
- No test requires exact frame timing.
- Visual review confirms obvious depth, readable project identity, and a non-template composition.
