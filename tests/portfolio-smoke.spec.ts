import { expect, test } from "@playwright/test";

test("AI recruiter journey, flagship proof, assets, and SEO stay intact", async ({
  page,
  request,
}, testInfo) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: /AI software,\s*built beyond\s*the demo/i }),
  ).toBeVisible();
  await expect(page.locator(".hero-availability")).toContainText("AI Software Engineer");
  await expect(page.getByText("Open to AI software roles")).toBeVisible();

  const heroCv = page.locator(".hero-copy").getByRole("link", { name: "Download my CV" });
  await expect(heroCv).toBeVisible();
  await expect(heroCv).toHaveAttribute("href", "/cv");

  await expect(
    page.getByRole("heading", { name: /Two systems\.\s*Two different kinds of proof\./i }),
  ).toBeVisible();
  await expect(
    page.locator("#project-talktogreekdata").getByRole("heading", {
      name: "TalkToGreekData.gr",
    }),
  ).toBeVisible();
  await expect(
    page.locator("#project-quar").getByRole("heading", { name: "Quar.gr" }),
  ).toBeVisible();
  await expect(page.getByText("Works over 23,000 data points and 207 metrics.")).toBeVisible();
  await expect(page.getByText("Serving 10+ cafes in production, with 300+ commits behind the product.")).toBeVisible();

  await expect(page.getByRole("heading", { name: /The range behind\s*the positioning\./i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "TrackSights OEM data pipeline" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Demos Vibes" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /High standards,\s*held for a while\./i })).toBeVisible();
  await expect(page.getByText("19,150/20,000")).toBeVisible();
  await expect(page.getByText("2x finalist")).toBeVisible();
  await expect(page.getByRole("heading", { name: /From data teams\s*to founder work\./i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /I build the thing\.\s*Then I make it\s*understandable\./i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Tools in service\s*of shipped systems\./i }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Answers without the scroll hunt." })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /The fastest way to\s*see the full picture\./i }),
  ).toBeVisible();

  const firstFaq = page.locator("details").first();
  await page.getByText("What roles is Dimosthenis Gkontolias strongest for?").click();
  await expect(
    page.getByText(
      "AI Software Engineer roles where React, TypeScript, Python, FastAPI, RAG systems, cloud data work, and practical product engineering meet real users.",
    ),
  ).toBeVisible();
  await expect(firstFaq).toHaveAttribute("open", "");

  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  const recruiterPath = page.getByRole("link", { name: "See flagship work" });
  await expect(recruiterPath).toHaveAttribute("href", "#work");
  await recruiterPath.click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeVisible();

  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(horizontalOverflow).toBeLessThanOrEqual(2);

  for (let step = 0; step < 18; step += 1) {
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(70);
  }
  await page.waitForLoadState("networkidle");

  const imageCount = await page.locator("img").count();
  for (let index = 0; index < imageCount; index += 1) {
    const image = page.locator("img").nth(index);
    await image.scrollIntoViewIfNeeded();
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

  const hashLinkIssues = await page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'))
      .filter((anchor) => anchor.target || anchor.rel)
      .map((anchor) => ({
        href: anchor.getAttribute("href"),
        rel: anchor.rel,
        target: anchor.target,
      })),
  );
  expect(hashLinkIssues).toEqual([]);

  const externalRelIssues = await page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'))
      .filter((anchor) => !anchor.relList.contains("noopener") || !anchor.relList.contains("noreferrer"))
      .map((anchor) => anchor.href),
  );
  expect(externalRelIssues).toEqual([]);

  const unnamedInteractiveCount = await page.evaluate(
    () =>
      Array.from(document.querySelectorAll("a,button,summary")).filter((element) => {
        const label =
          element.textContent?.trim() ||
          element.getAttribute("aria-label") ||
          element.getAttribute("title");
        return !label;
      }).length,
  );
  expect(unnamedInteractiveCount).toBe(0);

  const designSystem = await page.evaluate(() => {
    const heroTitle = document.querySelector(".hero-title-line");
    const portraitRing = document.querySelector(".signal-ring-one");
    const workSection = document.querySelector("#work");
    const firstReveal = document.querySelector("[data-reveal]");

    return {
      heroAnimation: heroTitle ? getComputedStyle(heroTitle).animationName : "",
      ringAnimation: portraitRing ? getComputedStyle(portraitRing).animationName : "",
      revealAnimation: firstReveal ? getComputedStyle(firstReveal).animationName : "",
      contentVisibility: workSection ? getComputedStyle(workSection).contentVisibility : "",
      canvasCount: document.querySelectorAll("canvas").length,
      videoCount: document.querySelectorAll("video").length,
    };
  });
  const viewportWidth = page.viewportSize()?.width ?? 0;
  expect(designSystem.heroAnimation).toBe(
    viewportWidth >= 768 ? "hero-enter" : "none",
  );
  expect(designSystem.ringAnimation).toBe("signal-drift");
  expect(["reveal-left", "none"]).toContain(designSystem.revealAnimation);
  expect(designSystem.contentVisibility).toBe("auto");
  expect(designSystem.canvasCount).toBe(0);
  expect(designSystem.videoCount).toBe(0);

  const faviconLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]')).map((link) =>
      link.getAttribute("href"),
    ),
  );
  expect(faviconLinks.some((href) => href?.includes("/favicon.ico"))).toBe(true);
  expect(faviconLinks.some((href) => href?.includes("/icon.png"))).toBe(true);

  const faviconResponse = await request.get("/favicon.ico?v=2");
  expect(faviconResponse.ok()).toBe(true);
  expect(faviconResponse.headers()["content-type"]).toContain("image/x-icon");
  const faviconBytes = await faviconResponse.body();
  expect([...faviconBytes.slice(0, 4)]).toEqual([0, 0, 1, 0]);

  const resumeResponse = await request.get("/cv");
  expect(resumeResponse.ok()).toBe(true);
  expect(resumeResponse.headers()["content-type"]).toContain("application/pdf");
  const resumeBytes = await resumeResponse.body();
  expect(resumeBytes.subarray(0, 4).toString()).toBe("%PDF");

  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(canonical).toBe("https://dimosthenisgkontolias.com");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Dimosthenis Gkontolias | AI Software Engineer",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://dimosthenisgkontolias.com/images/og-card.png",
  );

  const ogImageResponse = await request.get("/images/og-card.png");
  expect(ogImageResponse.ok()).toBe(true);
  expect(ogImageResponse.headers()["content-type"]).toContain("image/png");

  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText()) as {
    "@graph": Array<{
      "@type"?: string;
      award?: string[];
      contactPoint?: Array<{
        contactType?: string;
        email?: string;
      }>;
      itemListElement?: Array<{
        item?: {
          image?: string;
          name?: string;
        };
      }>;
      jobTitle?: string[];
      knowsLanguage?: string[];
      mainEntity?: Array<{
        acceptedAnswer?: {
          text?: string;
        };
        name?: string;
      }>;
    }>;
  };
  const schemaTypes = schema["@graph"].map((node) => node["@type"]);
  expect(schemaTypes).toEqual(
    expect.arrayContaining(["Person", "WebSite", "ProfilePage", "FAQPage", "ItemList"]),
  );
  const person = schema["@graph"].find((node) => node["@type"] === "Person");
  expect(person?.jobTitle?.[0]).toBe("AI Software Engineer");
  expect(person?.knowsLanguage).toEqual(expect.arrayContaining(["Greek", "English", "German"]));
  expect(person?.contactPoint?.[0]).toEqual(
    expect.objectContaining({
      contactType: "recruiting",
      email: "dgodolias18@gmail.com",
    }),
  );
  const faqPage = schema["@graph"].find((node) => node["@type"] === "FAQPage");
  expect(faqPage?.mainEntity?.length).toBeGreaterThanOrEqual(5);
  expect(faqPage?.mainEntity?.map((item) => item.name)).toEqual(
    expect.arrayContaining(["Which projects should a recruiter inspect first?"]),
  );
  const itemList = schema["@graph"].find((node) => node["@type"] === "ItemList");
  expect(itemList?.itemListElement?.length).toBeGreaterThanOrEqual(9);
  const talkProject = itemList?.itemListElement
    ?.map((entry) => entry.item)
    .find((item) => item?.name === "TalkToGreekData.gr");
  expect(talkProject?.image).toBe(
    "https://dimosthenisgkontolias.com/images/projects/dataviz.webp",
  );

  const robotsResponse = await request.get("/robots.txt");
  const robots = await robotsResponse.text();
  expect(robots).toContain("User-Agent: GPTBot");
  expect(robots).toContain("Allow: /llms.txt");
  expect(robots).toContain("Sitemap: https://dimosthenisgkontolias.com/sitemap.xml");

  const sitemapResponse = await request.get("/sitemap.xml");
  const sitemap = await sitemapResponse.text();
  expect(sitemap).toContain("https://dimosthenisgkontolias.com");
  expect(sitemap).toContain("2026-07-26");

  const llmsResponse = await request.get("/llms.txt");
  expect(llmsResponse.ok()).toBe(true);
  const llms = await llmsResponse.text();
  expect(llms).toContain("AI Software Engineer");
  expect(llms).toContain("TalkToGreekData.gr: economic-data RAG product");
  expect(llms).toContain("Quar.gr: production QR menu platform");

  const manifestResponse = await request.get("/manifest.webmanifest");
  const manifest = (await manifestResponse.json()) as {
    icons?: Array<{ src?: string }>;
    name?: string;
    theme_color?: string;
  };
  expect(manifest.name).toBe("Dimosthenis Gkontolias — AI Software Engineer");
  expect(manifest.theme_color).toBe("#08140f");
  expect(manifest.icons?.some((icon) => icon.src === "/icon.png?v=2")).toBe(true);

  const vcardResponse = await request.get("/assets/dimosthenis-gkontolias.vcf");
  expect(vcardResponse.ok()).toBe(true);
  const vcard = await vcardResponse.text();
  expect(vcard).toContain("BEGIN:VCARD");
  expect(vcard).toContain("EMAIL;TYPE=INTERNET:dgodolias18@gmail.com");

  if (testInfo.project.name === "mobile") {
    await page.getByLabel("Open navigation").click();
    const creatorLink = page.getByRole("link", { name: /Creator/ }).last();
    await expect(creatorLink).toBeVisible();
    await expect(page.getByRole("link", { name: "Download CV" }).last()).toBeVisible();
    await creatorLink.click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.locator("#creator")).toBeVisible();
  }

  expect(consoleErrors).toEqual([]);
});

test("reduced motion keeps the complete journey static", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const motionState = await page.evaluate(() => {
    const heroTitle = document.querySelector(".hero-title-line");
    const portraitRing = document.querySelector(".signal-ring-one");
    const firstReveal = document.querySelector("[data-reveal]");

    return {
      heroAnimation: heroTitle ? getComputedStyle(heroTitle).animationName : "",
      ringAnimation: portraitRing ? getComputedStyle(portraitRing).animationName : "",
      revealAnimation: firstReveal ? getComputedStyle(firstReveal).animationName : "",
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    };
  });

  expect(motionState).toEqual({
    heroAnimation: "none",
    ringAnimation: "none",
    revealAnimation: "none",
    scrollBehavior: "auto",
  });

  await expect(
    page.locator(".hero-copy").getByRole("link", { name: "Download my CV" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "TalkToGreekData.gr" })).toBeVisible();
});

test("flagship navigation targets the approved recruiter story", async ({ page }) => {
  await page.goto("/");

  const workLink = page.getByRole("link", { name: "See flagship work" });
  await workLink.click();
  await expect(page).toHaveURL(/#work$/);
  await expect(
    page.locator("#project-talktogreekdata").getByRole("heading", {
      name: "TalkToGreekData.gr",
    }),
  ).toBeVisible();
  await expect(
    page.locator("#project-quar").getByRole("heading", { name: "Quar.gr" }),
  ).toBeVisible();
});

test("not found page stays branded and recoverable", async ({ page }) => {
  await page.goto("/missing-portfolio-route");

  await expect(page.getByRole("heading", { name: "Page not found." })).toBeVisible();
  await expect(page.getByAltText("DG logo")).toBeVisible();
  await expect(page.getByText("The strongest project evidence is on the main page.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to work" })).toHaveAttribute(
    "href",
    "/#work",
  );
  await expect(page.getByRole("link", { name: "Email Dimosthenis" })).toHaveAttribute(
    "href",
    "mailto:dgodolias18@gmail.com",
  );
});
