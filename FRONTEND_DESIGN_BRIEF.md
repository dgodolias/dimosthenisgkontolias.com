# Frontend Design Brief

## 1. Status, version, ownership

- Status: Approved and implemented
- Version: 2.0 — Project Orbit
- Date: 2026-07-26
- Product/content owner and final approver: Dimosthenis Gkontolias
- Design and engineering owner: Codex
- Supersedes: Version 1.0 after explicit owner rejection of its generic hero, improvised `DG` mark, boxed role/location badge, and insufficiently visible motion.
- Approval notes: Owner approved Project Orbit, then refined the direction to four real projects, a visible human portrait in the opening composition, CV as a recruiter action rather than an orbit body, and a softer editorial interface.

## 2. Decision delta

The following decisions are now explicit:

- Remove the square `DG` mark from the website header. It is not an approved logo and reads as a placeholder.
- Remove the bordered AI Software Engineer / Athens capsule from the hero.
- Replace the portrait-and-grid hero with **Project Orbit**, a project-specific interactive 3D composition.
- Increase S08 from “showcase with controlled CSS motion” to **Showcase with a signature spatial moment**.
- Activate runtime graphics and spatial presentation instead of treating 3D as excluded.
- Redesign the rest of the page around the same visual and motion grammar so the hero does not sit above a generic template.
- Keep the existing recruiter audience, AI Software Engineer positioning, CV conversion, English-only content, truthful proof, accessibility, and performance guardrails.

## 3. Scope and release boundary

- Mode: Production redesign.
- Surface: Public one-page portfolio, fixed navigation, mobile navigation, flagship case studies, supporting evidence, experience, skills, final CV/contact action, branded not-found page, and affected discovery/share metadata.
- Primary implementation: A progressively enhanced interactive 3D hero plus a bespoke editorial/cinematic page system.
- Existing Next.js application, public assets, CV, vCard, data model, project links, structured data, and SEO endpoints remain the base.
- No CMS, authentication, commerce, account system, autoplay audio/video, runtime AI response, route-level application shell, or localization layer.
- No deploy, analytics provider, or field RUM integration unless separately requested.

## 4. Purpose, audience, success, and guardrails

- Primary audience: Recruiters and hiring managers.
- Target position: AI Software Engineer.
- Primary conversion: Download the CV.
- Primary perception target: “This engineer can combine AI/data depth, product judgment, and unusually strong execution.”
- Primary behavioral success: A recruiter understands the role in the opening viewport, recognizes two credible flagship projects, can inspect proof, and can open the CV without a forced download.
- Memorability target: A visitor can later describe the portfolio as “the one where his real projects orbit in 3D.”
- Guardrails:
  - The 3D scene must reveal proof rather than cover it.
  - The CV remains a first-viewport semantic link.
  - Essential text never waits for 3D initialization.
  - Claims remain grounded in repository-owned content.
  - Keyboard, touch, reduced-motion, forced-colors, no-WebGL, and low-capability paths remain complete.
  - No scroll hijacking.
  - No excessive neon, cyberpunk glow, generic glassmorphism, stock particle galaxy, or stock AI brain.

## 5. Risk and context

- Product risk: Low-to-medium.
- Material failure: losing a hiring opportunity through unclear positioning, generic visual identity, inaccessible interaction, excessive load, motion discomfort, or broken CV/project links.
- Primary context: Fast desktop/laptop review during sourcing or candidate evaluation.
- Secondary context: Mobile visit from LinkedIn, email, or social sharing.
- Supported inputs: Keyboard, pointer, touch.
- Supported language: English, LTR.
- Accessibility target: WCAG 2.2 AA across the complete recruiter journey.
- Baseline support: Current stable Chromium, Firefox, and Safari families.

## 6. Product archetype and trigger register

- Archetype: Recruiter-facing portfolio with editorial storytelling, spatial project inspection, and cinematic proof.
- Active contextual modules:
  - M02 Editorial/publishing/discovery.
  - M10 Spatial/3D, scoped to a bounded web scene rather than XR.
- Active feature triggers:
  - C07 photography, screenshots, icons, and generated graphic surfaces.
  - C09 proof metrics and comparative evidence.
  - D08 motion, transitions, scroll-linked continuity, and ambient scene motion.
  - O08 expressive/hedonic quality.
- Active amplifiers:
  - X01 expressive typography and composition.
  - X02 signature imagery.
  - X03 microinteractions and tactile response.
  - X04 motion and transitions.
  - X05 cinematic/scrollytelling.
  - X06 real-time/generative graphics.
  - X07 3D/spatial presentation.
- N/A-D:
  - C08 audio/video remains excluded.
  - X08 sound/haptics remains excluded unless the owner explicitly reopens it.
  - M01, M03-M09, M11, and M12 remain inactive because the portfolio has no transaction, analytical decision workflow, UGC, collaboration, runtime AI action, education flow, game loop, regulated decision, or offline continuity contract.

## 7. Core content and proof model

The scene uses four canonical recruiter-proof project bodies:

1. **TalkToGreekData.gr**
   - Signal: AI product engineering.
   - Proof: RAG over 23,000 data points and 207 metrics, streaming answers, 12 chart types.
   - Interface visual source: `/images/projects/dataviz-en.webp`.
   - Background source: the real `AmbientWaves.tsx` implementation from `PROJECTS/DataViz`, including its two Catmull-Rom gradient ribbons, breathing width, blurred indigo/cyan material, orbit reversals, light-theme orbs, and dot grid.
2. **Quar.gr**
   - Signal: Founder ownership and production product work.
   - Proof: 10+ cafes in production, 300+ commits, admin editing, multilingual content, analytics, support.
   - Interface visual source: `/images/projects/quar-en.webp`.
   - Background source: the real `InteractiveSquares.tsx` implementation from `PROJECTS/QuaR`, including its 16-item size ladder, four-column spawn, 100 px/s rise, rotation, respawn, depth parallax, amber proximity glow, pointer spotlight, and click ripple.
3. **TrackSights**
   - Signal: Data engineering and modeling depth.
   - Proof: 785k listings, 71 features, 8 European markets, held-out R² 0.946.
   - Visual source: a generated data/proof panel using existing verified metrics; no invented screenshot.
4. **Demos Vibes**
   - Signal: Distribution and technical communication.
   - Proof: practical Greek AI content paired with reusable resource pages.
   - Visual source: `/images/projects/demosvibes.webp`.
The CV remains a clear recruiter action in the header, hero, experience, and closing contact section; it is not presented as project evidence. An authentic portrait is layered into the opening composition as the human anchor behind the systems.

## 8. Brand and messaging

### Position

Dimosthenis is not presented as “a developer with a list of technologies.” He is presented as an engineer who makes difficult systems understandable and operational.

### Primary message

**I build software that makes complex things feel obvious.**

### Supporting message

AI Software Engineer, AUEB valedictorian, Quar.gr founder, and former TrackSights data intern working across retrieval, data systems, and product engineering.

### Proof sequence

1. Real projects appear before long biography.
2. TalkToGreekData establishes the AI fit.
3. Quar establishes production ownership.
4. TrackSights establishes technical depth.
5. Demos Vibes establishes communication and distribution.
6. The dedicated CV action closes the handoff without pretending to be a project.

### Voice

- Direct, precise, ambitious, and evidence-led.
- Short sentences at expressive moments.
- Technical terms only where they create credibility.
- No inflated “visionary,” “revolutionary,” or “AI-powered everything” language.

## 9. Creative direction

### Concept

**Project Orbit — Proof has gravity.**

The work is not arranged as interchangeable cards. Each project has mass, color, depth, and an orbit determined by its role in the candidate story. The recruiter can move through the system, bring evidence into focus, and continue directly into the relevant case study.

### Visual philosophy

- Matte editorial materials rather than glass panels.
- Deep ink space rather than a generic graph-paper hero.
- Real product screens rather than abstract AI decoration.
- Directional shadows, depth, occlusion, and controlled perspective rather than glow.
- Monumental type paired with small engineering labels.
- One acid signal color used for focus and interaction, not as ambient neon.
- Project-native colors remain visible inside their own screens.

### Memorability device

A real-time 3D orbit containing four actual projects, with the portrait establishing who built them. Its interaction language continues into each case study and the closing CV moment.

### Style coordinates

1. Density: Airy text field with concentrated spatial detail.
2. Complexity: High at the orbit, intentionally edited elsewhere.
3. Familiarity: Conventional recruiter actions inside an experimental composition.
4. Composition: Strongly asymmetric and layered.
5. Geometry: Precise orbital curves and planar project surfaces.
6. Dimensionality: True real-time 3D in the hero; layered 2.5D continuation below.
7. Materiality: Matte paper, ink, screen light, restrained texture.
8. Color: Deep neutral field, warm bone text, controlled acid focus, project-native accents.
9. Typography: Monumental editorial display plus compact technical sans/mono.
10. Imagery: Authentic project screens and portrait.
11. Motion: Reactive, physical, cinematic, and interruptible.
12. Character: Serious, surprising, and engineered rather than playful.
13. Finish: High craft, with no placeholder identity device.
14. Rhythm: Immediate proof, slow inspection, decisive handoff.

## 10. Information architecture

1. Minimal fixed wordmark navigation.
2. Full-viewport Project Orbit hero.
3. Compact proof runway integrated into the hero exit.
4. TalkToGreekData interactive AI product case study.
5. Quar spatial product/founder case study.
6. Track record rail for TrackSights, Demos Vibes, and selected supporting work.
7. Human/operator section with portrait, experience, and operating principles.
8. Technical capability index.
9. Recruiter FAQ with native disclosure controls.
10. CV “return object” closing scene and contact routes.
11. Footer and recovery paths.

The current generic positioning split, equal-weight card treatments, boxed hero badge, and improvised logo mark are removed.

## 11. Hero composition

### Header

- Full-name wordmark only: `Dimosthenis Gkontolias`.
- Secondary line: `AI Software Engineer`.
- No monogram square.
- No role/location capsule.
- Desktop actions: Work, Experience, Contact, Check CV.
- Mobile: full-name wordmark plus accessible menu trigger.
- Initial header uses a transparent/dark spatial treatment; it becomes a compact solid navigation surface after leaving the hero.

### Copy plane

- Eyebrow: `AI SOFTWARE ENGINEER / ATHENS`.
- H1: `I build software that makes complex things feel obvious.`
- Supporting sentence: concise positioning and verified identity signals.
- Primary CTA: `Check CV`, opening the inline `/cv` preview in a new tab.
- Secondary CTA: `Inspect the work`.
- Instructional cue: `Drag to orbit · select a project · scroll to enter`.
- No bordered badge, chip cloud, or decorative location pin.

### Orbit plane

- Occupies roughly 58–64% of desktop visual width.
- Extends behind and beside the copy without reducing text contrast.
- Uses four bounded project bodies with readable selected-state labels.
- TalkToGreekData begins nearest the front; Quar is visibly next in the orbit.
- A low-density orbit trail and proof coordinates create depth without becoming a star-field effect.

## 12. Critical journeys

### J01 — Understand and download

1. Recruiter lands on a server-rendered hero.
2. Role and positioning are immediately readable.
3. The CV link is present before 3D initialization.
4. The scene assembles without blocking interaction.
5. Recruiter opens the CV preview from the hero, navigation, experience, or final contact section and may save it from the browser viewer if desired.

Recovery: If JavaScript, WebGL, textures, or motion are unavailable, the fallback composition and direct CV link remain complete.

### J02 — Inspect proof

1. Recruiter sees recognizable project screens in orbit.
2. Pointer, touch, keyboard, or the visible project rail selects a project.
3. The selected body rotates to the inspection position.
4. Its verified proof and recruiter signal appear in semantic DOM.
5. Activation scrolls to its case study or opens its verified public destination.

Recovery: Visible DOM project controls provide the same route if canvas selection fails.

### J03 — Scan without interacting

1. Recruiter ignores the 3D scene.
2. Headline, summary, CTA, selected-project label, and proof remain understandable.
3. Standard scrolling enters the case studies.
4. No interaction is required to discover TalkToGreekData, Quar, or the separate CV action.

## 13. Interaction and motion contract

- Orbit motion communicates project relationships and focus.
- Autonomous movement is slow and pauses on hover, focus, drag, tab invisibility, and offscreen state.
- Pointer movement creates bounded camera parallax.
- Horizontal drag rotates the orbit.
- Touch preserves normal vertical page scroll and only captures a clear horizontal gesture.
- Keyboard focus on the project rail changes the focused project; Arrow Left/Right operate only while that control owns focus.
- Enter follows the selected project action.
- Scrolling never becomes trapped.
- The hero exit gently moves TalkToGreekData toward the case-study plane, creating visual continuity without scroll hijacking.
- Hover-only information is prohibited.
- Every continuously moving layer has a static/reduced equivalent.

## 14. Responsive behavior

### Wide desktop, 1440–1920px

- Copy occupies 36–42%; orbit occupies the remaining stage.
- Five bodies remain visible through depth and occlusion.
- Pointer parallax and drag are enabled.
- H1 remains within approximately four lines.

### Laptop/tablet landscape, 1024–1439px

- Orbit radius and card size reduce.
- Four bodies remain visually legible; the fifth remains selectable through the project rail.
- Proof panel sits below the copy rather than over it.

### Tablet/large mobile, 768–1023px

- Copy leads, orbit sits in a dedicated 48–56svh stage.
- Three project bodies are visible at once.
- Touch drag is enabled with conservative motion amplitude.

### Mobile, 320–767px

- H1, primary CTA, and selected-project proof appear before the orbit stage.
- Scene uses reduced DPR, fewer trace points, and a smaller camera range.
- Project rail becomes a horizontal semantic selector.
- If capability or energy checks fail, a layered static composition replaces WebGL.
- No initial opacity animation delays first content.

### Zoom and reflow

- At 200% zoom and narrow layout, the 3D layer moves below essential text.
- Navigation, project controls, and CV actions remain visible and operable.
- No project name, metric, or action is encoded only inside the canvas.

## 15. Accessibility, comfort, and equivalent paths

- Canvas is enhancement, not the semantic source of truth.
- Project names, descriptions, metrics, status, and links live in DOM.
- Canvas receives an accessible summary or is hidden when the adjacent DOM fully describes it.
- Visible focus never depends on WebGL.
- Reduced motion:
  - no autonomous orbit;
  - no pointer parallax;
  - no scroll-linked camera travel;
  - project screens form a deliberate static layered composition;
  - all controls and destinations remain available.
- Forced colors:
  - canvas may be suppressed;
  - semantic fallback uses system colors, borders, and focus indicators.
- Motion amplitude, rotation speed, and camera travel remain below discomfort thresholds for a bounded web presentation.
- No flashes, rapid zooms, repeated shaking, or full-screen rotation.
- A “Pause motion” control appears when continuous orbit is active.
- WebGL context loss swaps to the static composition without losing the selected project or CTA.

## 16. Capability and degradation model

Enhancement tiers:

- Tier A: Full 3D — WebGL, normal data preference, sufficient capability, no reduced motion.
- Tier B: Reduced 3D — low DPR, fewer objects/traces, lower frame target, no continuous ambient particles.
- Tier C: Static spatial poster — CSS/DOM layered project screens with semantic controls.
- Tier D: Plain semantic hero — headline, project list, proof, and CV link.

Inputs used for conservative enhancement:

- `prefers-reduced-motion`.
- `navigator.connection?.saveData` when available.
- device pixel ratio cap.
- `hardwareConcurrency` and optional device memory hints.
- WebGL creation failure or context loss.
- page visibility and hero intersection state.

The user is never told their device is “weak”; the visual simply degrades gracefully.

## 17. Performance and resource contract

- Server-render all essential hero text, project labels, and CV/project links.
- Dynamically import Three.js after the semantic hero exists.
- Use direct Three.js rather than React Three Fiber to avoid a second rendering abstraction and reduce overhead.
- Keep the orbit in one isolated client component; the rest of the page remains server/static-first.
- Initial 3D texture set:
  - TalkToGreekData: ~28KB.
  - Quar: ~54KB.
  - Demos Vibes: ~62KB.
  - TrackSights panel: generated locally from verified text, no network image.
- Dynamic 3D JavaScript target: at or below approximately 220KB gzip.
- Initial orbit asset target: at or below approximately 250KB transferred.
- DPR cap: 1.5 desktop, 1.25 mobile; Tier B uses 1.0.
- Frame target: 55–60fps desktop; 30–45fps mobile/Tier B.
- Stop rendering when the hero is offscreen or the tab is hidden.
- Resize through `ResizeObserver`; avoid window-wide state rerenders.
- Pointer/parallax values live in refs and are applied inside the render loop.
- The below-fold flagship effects ship in a separate async chunk and are requested only when an effect sentinel enters a 500 px preload margin.
- TalkToGreekData renders its slow blurred ribbons at 24fps with delta-time-corrected motion, a 0.75 internal scale on desktop, and 0.70 on constrained/mobile devices. Its source timing and wall-clock speed remain unchanged.
- QuaR renders at 30fps while rising idly and promotes to 60fps only during fine-pointer interaction on capable desktops; constrained/touch devices remain at 30fps.
- Both effects read section dimensions only during `ResizeObserver` updates, never inside the hot frame loop.
- Canvas memory, requestAnimationFrame work, CSS orb animation, pointer geometry, and compositor `will-change` layers remain deferred or paused until the owning section is actually visible.
- No post-processing pipeline, bloom stack, physics engine, environment-map download, or full-screen shader unless later evidence justifies it.
- Core Web Vitals targets remain:
  - LCP ≤ 2.5s at p75 after deployment.
  - INP ≤ 200ms at p75.
  - CLS ≤ 0.1.
- Lab checks report both observed and simulated values honestly.

## 18. Page-wide continuation

The orbit is a grammar, not a one-off:

- Section numbers use orbital coordinates rather than generic boxed eyebrows.
- Lines connect proof to the project that owns it.
- TalkToGreekData uses its source-product light data field with the original moving indigo/cyan ribbons, ambient orbs, and dot grid.
- Quar uses a dimensional menu plane inside the source-product beige field with the original rising squares and pointer-reactive amber light.
- Supporting work moves along a horizontal evidence rail rather than a repeated card grid.
- Experience becomes a build log with dates, roles, and inspectable outcomes.
- The portrait is framed as the human anchor inside the hero, not a generic “about me” card.
- The final CV action echoes the orbit with a soft circular form while remaining an action, never a project body.
- Motion uses the same “orbit → magnetize → inspect → release” sequence throughout.
- Both flagship source effects are section-local, pause outside the viewport or in a hidden tab, and resolve to a complete static composition under reduced motion.

## 19. Expressive contract

S08: **Showcase with a signature spatial moment**.

- X01 target H3: Typography and asymmetric composition remain recognizable across the whole page.
- X02 target H3: Real project imagery and portrait create ownable proof.
- X03 target H3: Focus, drag, project selection, and CTA response feel tactile and consistent.
- X04 target H3: Motion follows one physical grammar—orbital movement, magnetic focus, inspection, release.
- X05 target H3: Hero-to-case-study transition improves narrative orientation.
- X06 target H2: Procedural orbit traces and generated proof surfaces respond meaningfully without becoming a stock particle effect.
- X07 target H3: 3D materially improves inspection and presence, with coherent camera, lighting, material, and fallback behavior.
- X08 remains N/A-D.

Removal criteria:

- Remove any effect that obscures the role or CV CTA.
- Remove any layer that does not connect to a real project or recruiter proof.
- Reduce or disable the scene if it materially harms LCP, INP, battery, thermal behavior, keyboard use, or motion comfort.
- Do not compensate for weak content with more particles, glow, blur, or camera movement.

## 20. Evidence plan

- Static semantic journey with JavaScript disabled.
- Full 3D journey on desktop Chromium.
- Art-directed mobile fallback with lightweight CSS motion and no Three.js download below 768px.
- Static fallback through reduced motion and forced-colors modes.
- Simulated WebGL initialization failure and context loss.
- Keyboard selection, visible focus, and project/CV activation.
- Touch horizontal drag without blocking vertical scroll.
- Pause/resume behavior.
- Scene stops offscreen and when tab visibility changes.
- Desktop and mobile screenshots at hero idle, selected TalkToGreekData, selected Quar, and fallback states.
- Performance profiling for dynamic bundle, texture transfer, frame rate, long tasks, and Lighthouse.
- Firefox and Safari manual review where available.
- Existing SEO, metadata, JSON-LD, sitemap, robots, manifest, PDF, vCard, external-link, overflow, and 404 tests remain green.
- `npm run lint`, `npm run build`, and `npm run test:smoke` pass.

## 21. Definition of Done

- The rejected `DG` square and boxed role/location capsule are absent.
- The opening screen clearly communicates the AI Software Engineer role and includes a functional CV link.
- The Project Orbit contains real, correctly labeled project evidence.
- TalkToGreekData and Quar are the first two visual and semantic project priorities.
- Pointer, touch, keyboard, reduced-motion, no-WebGL, and static paths are complete.
- The orbit does not block normal scroll or essential content.
- No P0/P1 accessibility, task, trust, or motion-comfort finding remains.
- No horizontal overflow, unnamed control, broken asset, or console error.
- The spatial grammar continues beyond the hero and the page no longer reads as a generic card template.
- Owner approves the desktop and mobile visual result.

## 22. Ordered implementation plan after approval

1. Remove rejected header mark, boxed hero badge, and obsolete portrait signal composition.
2. Establish Project Orbit tokens, wordmark header, message hierarchy, and semantic fallback.
3. Build the isolated orbit client component and capability tiers.
4. Add real project textures, the generated TrackSights panel, camera, lighting, orbit geometry, and selection state.
5. Add pointer, drag, keyboard, pause, visibility, scroll continuity, context-loss, and reduced-motion behavior.
6. Recompose TalkToGreekData and Quar case studies around their own spatial interaction.
7. Replace generic supporting grids with an evidence rail, build log, human-led hero, and final CV return.
8. Update tests, metadata wording where needed, and completion documentation.
9. Run functional, visual, accessibility, motion, WebGL fallback, performance, and cross-viewport QA.
10. Present representative screenshots and measured evidence for final owner review.

## 23. Approval gate

The only open mandatory decision is owner approval of this Version 2.0 Design Map. Implementation must not start until approval is explicit.
