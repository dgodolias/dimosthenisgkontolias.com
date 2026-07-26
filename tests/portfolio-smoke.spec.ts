import { expect, test } from "@playwright/test";

test("Project Orbit recruiter journey, proof, assets, and SEO stay intact", async ({
  page,
  request,
}, testInfo) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  await page.goto("/");

  const hero = page.locator(".orbit-hero");
  await expect(hero.locator("#hero-title")).toContainText(
    "I build softwarethat makes complexthings feel obvious.",
  );
  await expect(hero.getByText("AI Software Engineer", { exact: true })).toBeVisible();
  await expect(hero.locator(".orbit-person img")).toBeVisible();
  await expect(hero.locator(".orbit-person img")).toHaveAttribute(
    "src",
    /profile-hero\.jpeg/,
  );

  const heroCv = hero.getByRole("link", { name: "Check CV" });
  await expect(heroCv).toHaveAttribute("href", "/cv");
  await expect(heroCv).toHaveAttribute("target", "_blank");
  await expect(heroCv).not.toHaveAttribute("download");
  await expect(hero.getByRole("link", { name: "Inspect the work" })).toHaveAttribute(
    "href",
    "#work",
  );

  const orbit = page.locator("[data-orbit-root]");
  await expect(orbit).toBeVisible();
  await expect(orbit).toHaveAttribute("data-orbit-theme", "daylight");
  await expect
    .poll(() => orbit.getAttribute("data-orbit-mode"))
    .toMatch(/^(full|reduced|static)$/);

  const heroPalette = await page.locator(".orbit-hero").evaluate((hero) => {
    const heroStyles = getComputedStyle(hero);
    const titleStyles = getComputedStyle(
      hero.querySelector<HTMLElement>(".orbit-hero-title")!,
    );

    return {
      background: heroStyles.backgroundColor,
      color: titleStyles.color,
    };
  });
  expect(heroPalette).toEqual({
    background: "rgb(248, 249, 241)",
    color: "rgb(16, 28, 23)",
  });

  const talkBackground = page.locator(
    '[data-source-effect="dataviz-ambient-waves"]',
  );
  const quarBackground = page.locator(
    '[data-source-effect="quar-interactive-squares"]',
  );
  const talkBackgroundLoader = page.locator(
    '[data-effect-loader="talktogreekdata"]',
  );
  const quarBackgroundLoader = page.locator(
    '[data-effect-loader="quar"]',
  );
  await expect(talkBackgroundLoader).toHaveAttribute(
    "data-load-state",
    "deferred",
  );
  await expect(quarBackgroundLoader).toHaveAttribute(
    "data-load-state",
    "deferred",
  );
  await expect(talkBackground).toHaveCount(0);
  await expect(quarBackground).toHaveCount(0);

  const selectors = orbit.locator("[data-orbit-project]");
  await expect(selectors).toHaveCount(4);
  expect((await selectors.allTextContents()).join(" ")).not.toContain(
    "Curriculum Vitae",
  );
  await expect(
    orbit.locator("[data-orbit-project='project-talktogreekdata']"),
  ).toHaveAttribute("aria-pressed", "true");

  await orbit.locator("[data-orbit-project='project-quar']").click();
  await expect(
    orbit.locator("[data-orbit-project='project-quar']"),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(orbit.getByRole("heading", { name: "Quar.gr" })).toBeVisible();

  const orbitMode = await orbit.getAttribute("data-orbit-mode");
  if (orbitMode !== "static") {
    const pause = orbit.getByRole("button", { name: "Pause motion" });
    await pause.click();
    await expect(orbit).toHaveAttribute("data-orbit-state", "paused");
    await expect(orbit.getByRole("button", { name: "Resume motion" })).toBeVisible();
  }

  const inspectWork = hero.getByRole("link", { name: "Inspect the work" });
  await inspectWork.click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeVisible();
  await expect(
    page.locator("#project-talktogreekdata").getByRole("heading", {
      name: "TalkToGreekData.gr",
    }),
  ).toBeVisible();
  await expect(
    page.locator("#project-quar").getByRole("heading", { name: "Quar.gr" }),
  ).toBeVisible();
  await expect(
    page.locator("#project-talktogreekdata img").first(),
  ).toHaveAttribute("src", /dataviz-en\.webp/);
  await expect(page.locator("#project-quar img").first()).toHaveAttribute(
    "src",
    /quar-en\.webp/,
  );
  await expect(
    page.getByText("Works over 23,000 data points and 207 metrics."),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Serving 10+ cafes in production, with 300+ commits behind the product.",
    ),
  ).toBeVisible();

  await page.locator("#project-talktogreekdata").scrollIntoViewIfNeeded();
  await expect(talkBackgroundLoader).toHaveAttribute(
    "data-load-state",
    "loaded",
  );
  await expect(talkBackground).toBeVisible();
  await expect(talkBackground.locator("canvas")).toHaveCount(1);
  await expect(talkBackground).toHaveAttribute(
    "data-motion-state",
    "running",
  );
  await expect(talkBackground).toHaveAttribute("data-target-fps", "24");
  const talkCanvasScale = await talkBackground
    .locator("canvas")
    .evaluate((canvas) => {
      const element = canvas as HTMLCanvasElement;
      const bounds = element.getBoundingClientRect();

      return {
        x: element.width / bounds.width,
        y: element.height / bounds.height,
      };
    });
  const talkDprCap = Number.parseFloat(
    (await talkBackground.getAttribute("data-dpr-cap")) || "0",
  );
  const talkRenderScale = Number.parseFloat(
    (await talkBackground.getAttribute("data-render-scale")) || "0",
  );
  const devicePixelRatio = await page.evaluate(() => window.devicePixelRatio);
  const expectedCanvasScale = Math.max(
    0.65,
    Math.min(devicePixelRatio, talkDprCap) * talkRenderScale,
  );
  expect(talkCanvasScale.x).toBeCloseTo(expectedCanvasScale, 2);
  expect(talkCanvasScale.y).toBeCloseTo(expectedCanvasScale, 2);
  await page.waitForTimeout(150);
  const talkFrameBefore = await talkBackground
    .locator("canvas")
    .evaluate((canvas) => (canvas as HTMLCanvasElement).toDataURL());
  await page.waitForTimeout(250);
  const talkFrameAfter = await talkBackground
    .locator("canvas")
    .evaluate((canvas) => (canvas as HTMLCanvasElement).toDataURL());
  expect(talkFrameAfter).not.toBe(talkFrameBefore);

  await page.locator("#project-quar").scrollIntoViewIfNeeded();
  await expect(quarBackgroundLoader).toHaveAttribute(
    "data-load-state",
    "loaded",
  );
  await expect(quarBackground).toBeVisible();
  await expect(quarBackground.locator(".quar-background-scrap")).toHaveCount(16);
  await expect(quarBackground).toHaveAttribute(
    "data-motion-state",
    "running",
  );
  await expect(quarBackground).toHaveAttribute(
    "data-target-fps",
    /^30(?:-idle\/60-interactive)?$/,
  );
  await page.waitForTimeout(150);
  const quarTransformBefore = await quarBackground
    .locator(".quar-background-scrap")
    .first()
    .evaluate((element) => element.style.transform);
  await page.waitForTimeout(250);
  const quarTransformAfter = await quarBackground
    .locator(".quar-background-scrap")
    .first()
    .evaluate((element) => element.style.transform);
  expect(quarTransformAfter).not.toBe(quarTransformBefore);

  if (testInfo.project.name === "desktop") {
    const quarBounds = await quarBackground.boundingBox();
    expect(quarBounds).not.toBeNull();

    if (quarBounds) {
      await page.mouse.move(
        quarBounds.x + quarBounds.width * 0.72,
        quarBounds.y + quarBounds.height * 0.38,
      );
      await expect
        .poll(() =>
          quarBackground
            .locator(".quar-background-spot")
            .evaluate((element) => Number.parseFloat(element.style.opacity || "0")),
        )
        .toBeGreaterThan(0.1);
    }
  }

  await expect(
    page.getByRole("heading", { name: /The range behind\s*the positioning\./i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "TrackSights OEM data pipeline" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Demos Vibes" })).toBeVisible();
  await expect(page.getByText("19,150/20,000")).toBeVisible();
  await expect(page.getByText("2x finalist")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /From data teams\s*to founder work\./i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: /I build the thing\.\s*Then I make it\s*understandable\./i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Tools in service\s*of shipped systems\./i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Answers without the scroll hunt." }),
  ).toBeVisible();

  const firstFaq = page.locator("details").first();
  await page
    .getByText("What roles is Dimosthenis Gkontolias strongest for?")
    .click();
  await expect(firstFaq).toHaveAttribute("open", "");
  await expect(talkBackground).toHaveAttribute(
    "data-motion-state",
    "paused",
  );
  await expect(quarBackground).toHaveAttribute(
    "data-motion-state",
    "paused",
  );
  await expect(
    quarBackground.locator(".quar-background-scrap").first(),
  ).toHaveCSS("will-change", "auto");

  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(horizontalOverflow).toBeLessThanOrEqual(2);

  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  for (let step = 0; step < 14; step += 1) {
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(50);
  }

  const imageCount = await page.locator("img").count();
  for (let index = 0; index < imageCount; index += 1) {
    const image = page.locator("img").nth(index);
    await image.evaluate((element) =>
      element.scrollIntoView({ block: "center", inline: "nearest" }),
    );
    await expect
      .poll(
        () =>
          image.evaluate((element) => {
            const img = element as HTMLImageElement;
            return img.complete && img.naturalWidth > 0 ? "" : img.currentSrc || img.src;
          }),
        { timeout: 20_000 },
      )
      .toBe("");
  }

  const linkIssues = await page.evaluate(() => ({
    malformedHashLinks: Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    )
      .filter((anchor) => anchor.target || anchor.rel)
      .map((anchor) => anchor.href),
    unsafeExternalLinks: Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'),
    )
      .filter(
        (anchor) =>
          !anchor.relList.contains("noopener") ||
          !anchor.relList.contains("noreferrer"),
      )
      .map((anchor) => anchor.href),
    unnamedInteractives: Array.from(
      document.querySelectorAll("a,button,summary"),
    ).filter(
      (element) =>
        !(
          element.textContent?.trim() ||
          element.getAttribute("aria-label") ||
          element.getAttribute("title")
        ),
    ).length,
  }));
  expect(linkIssues).toEqual({
    malformedHashLinks: [],
    unsafeExternalLinks: [],
    unnamedInteractives: 0,
  });

  const runtime = await page.evaluate(() => {
    const root = document.querySelector("[data-orbit-root]");
    const canvas = document.querySelector(".orbit-canvas");
    const workSection = document.querySelector("#work");

    return {
      orbitMode: root?.getAttribute("data-orbit-mode"),
      canvasCount: document.querySelectorAll("canvas").length,
      canvasDisplay: canvas ? getComputedStyle(canvas).display : "",
      contentVisibility: workSection
        ? getComputedStyle(workSection).contentVisibility
        : "",
      videoCount: document.querySelectorAll("video").length,
    };
  });
  expect(["full", "reduced", "static"]).toContain(runtime.orbitMode);
  expect(runtime.canvasCount).toBe(2);
  expect(runtime.videoCount).toBe(0);
  expect(["auto", "visible"]).toContain(runtime.contentVisibility);
  if (runtime.orbitMode === "static") {
    expect(runtime.canvasDisplay).toBe("none");
  }

  const faviconResponse = await request.get("/favicon.ico?v=2");
  expect(faviconResponse.ok()).toBe(true);
  expect(faviconResponse.headers()["content-type"]).toContain("image/x-icon");
  expect([...(await faviconResponse.body()).slice(0, 4)]).toEqual([0, 0, 1, 0]);

  const resumeResponse = await request.get("/cv");
  expect(resumeResponse.ok()).toBe(true);
  expect(resumeResponse.headers()["content-type"]).toContain("application/pdf");
  expect((await resumeResponse.body()).subarray(0, 4).toString()).toBe("%PDF");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://dimosthenisgkontolias.com",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /index, follow/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://dimosthenisgkontolias.com/images/og-card.png",
  );

  const schema = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  ) as {
    "@graph": Array<{
      "@type"?: string;
      image?: string;
      jobTitle?: string[];
      knowsLanguage?: string[];
      mainEntity?: Array<{ name?: string }>;
      itemListElement?: Array<{ item?: { image?: string; name?: string } }>;
    }>;
  };
  const schemaTypes = schema["@graph"].map((node) => node["@type"]);
  expect(schemaTypes).toEqual(
    expect.arrayContaining([
      "Person",
      "WebSite",
      "ProfilePage",
      "FAQPage",
      "ItemList",
    ]),
  );
  const person = schema["@graph"].find((node) => node["@type"] === "Person");
  expect(person?.jobTitle?.[0]).toBe("AI Software Engineer");
  expect(person?.knowsLanguage).toEqual(
    expect.arrayContaining(["Greek", "English", "German"]),
  );
  expect(person?.image).toBe(
    "https://dimosthenisgkontolias.com/images/profile-hero.jpeg",
  );

  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("User-Agent: GPTBot");
  expect(robots).toContain(
    "Sitemap: https://dimosthenisgkontolias.com/sitemap.xml",
  );

  const llms = await (await request.get("/llms.txt")).text();
  expect(llms).toContain("TalkToGreekData.gr: economic-data RAG product");
  expect(llms).toContain("Quar.gr: production QR menu platform");

  const manifest = (await (
    await request.get("/manifest.webmanifest")
  ).json()) as {
    icons?: Array<{ src?: string }>;
    name?: string;
    theme_color?: string;
  };
  expect(manifest.name).toContain("Dimosthenis Gkontolias");
  expect(manifest.theme_color).toBe("#08140f");
  expect(manifest.icons?.some((icon) => icon.src === "/icon.png?v=2")).toBe(true);

  if (testInfo.project.name === "mobile") {
    await page.getByLabel("Open navigation").click();
    const creatorLink = page.getByRole("link", { name: /Creator/ }).last();
    await expect(creatorLink).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Check CV" }).last(),
    ).toBeVisible();
    await creatorLink.click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.locator("#creator")).toBeVisible();
  }

  expect(consoleErrors).toEqual([]);
});

test("reduced motion uses the complete static Project Orbit", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const orbit = page.locator("[data-orbit-root]");
  await expect(orbit).toHaveAttribute("data-orbit-mode", "static");
  await expect(orbit.locator("[data-orbit-fallback]")).toBeVisible();
  await expect(orbit.locator(".orbit-canvas")).toHaveCSS("display", "none");
  await expect(orbit.locator("[data-orbit-project]")).toHaveCount(4);
  await orbit.locator("[data-orbit-project='project-quar']").click();
  await expect(orbit.getByRole("heading", { name: "Quar.gr" })).toBeVisible();
  await expect(page.locator(".orbit-person img")).toBeVisible();

  const talkBackground = page.locator(
    '[data-source-effect="dataviz-ambient-waves"]',
  );
  const quarBackground = page.locator(
    '[data-source-effect="quar-interactive-squares"]',
  );
  await page.locator("#project-talktogreekdata").scrollIntoViewIfNeeded();
  await expect(talkBackground).toBeVisible();
  await expect(talkBackground).toHaveAttribute(
    "data-motion-state",
    "static",
  );
  await page.waitForTimeout(250);
  const talkFrameBefore = await talkBackground
    .locator("canvas")
    .evaluate((canvas) => (canvas as HTMLCanvasElement).toDataURL());
  await page.locator("#project-quar").scrollIntoViewIfNeeded();
  await expect(quarBackground).toBeVisible();
  await expect(quarBackground).toHaveAttribute(
    "data-motion-state",
    "static",
  );
  const quarTransformBefore = await quarBackground
    .locator(".quar-background-scrap")
    .first()
    .evaluate((element) => element.style.transform);
  await page.waitForTimeout(250);
  const talkFrameAfter = await talkBackground
    .locator("canvas")
    .evaluate((canvas) => (canvas as HTMLCanvasElement).toDataURL());
  const quarTransformAfter = await quarBackground
    .locator(".quar-background-scrap")
    .first()
    .evaluate((element) => element.style.transform);

  expect(talkFrameAfter).toBe(talkFrameBefore);
  expect(quarTransformAfter).toBe(quarTransformBefore);
  await expect(talkBackground.locator(".talk-data-orb").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(quarBackground.locator(".quar-background-spot")).toHaveCSS(
    "display",
    "none",
  );

  const motionState = await page.evaluate(() => {
    const firstReveal = document.querySelector("[data-reveal]");
    return {
      revealAnimation: firstReveal
        ? getComputedStyle(firstReveal).animationName
        : "",
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    };
  });
  expect(motionState).toEqual({
    revealAnimation: "none",
    scrollBehavior: "auto",
  });
});

test("flagship navigation targets the recruiter story", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Inspect the work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(
    page.locator("#project-talktogreekdata").getByRole("heading", {
      name: "TalkToGreekData.gr",
    }),
  ).toBeVisible();
  await expect(
    page.locator("#project-quar").getByRole("heading", { name: "Quar.gr" }),
  ).toBeVisible();

  const flagshipGutters = await page.evaluate(() => {
    const measure = (selector: string) => {
      const story = document.querySelector<HTMLElement>(selector);
      const copy = story?.querySelector<HTMLElement>(".flagship-copy");

      if (!story || !copy) {
        return null;
      }

      const styles = getComputedStyle(copy);

      return {
        left: Number.parseFloat(styles.paddingLeft),
        right: Number.parseFloat(styles.paddingRight),
      };
    };

    return {
      talk: measure("#project-talktogreekdata"),
      quar: measure("#project-quar"),
    };
  });

  expect(flagshipGutters.talk).not.toBeNull();
  expect(flagshipGutters.quar).not.toBeNull();
  expect(flagshipGutters.talk!.left).toBeGreaterThanOrEqual(18);
  expect(flagshipGutters.quar!.right).toBeGreaterThanOrEqual(18);
});

test("not found page stays branded and recoverable", async ({ page }) => {
  await page.goto("/missing-portfolio-route");

  await expect(
    page.getByRole("heading", { name: "Page not found." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Dimosthenis Gkontolias" }),
  ).toHaveAttribute("href", "/");
  await expect(
    page.getByText("The strongest project evidence is on the main page."),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to work" })).toHaveAttribute(
    "href",
    "/#work",
  );
  await expect(
    page.getByRole("link", { name: "Email Dimosthenis" }),
  ).toHaveAttribute("href", "mailto:dgodolias18@gmail.com");
});
