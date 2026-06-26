import { expect, test } from "@playwright/test";

test("portfolio content, navigation, favicon, and SEO stay intact", async ({
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
    page.getByRole("heading", { level: 1, name: "Dimosthenis Gkontolias" }),
  ).toBeVisible();
  await expect(page.getByText("What a recruiter can learn fast.")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Quiet proof that the work ethic is not new." }),
  ).toBeVisible();
  await expect(page.getByText("19,150/20,000")).toBeVisible();
  await expect(page.getByText("2x finalist")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Projects that shipped beyond the repo." }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Demos Vibes is my public lab for AI tools, workflows, and reusable resources.",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "I am looking for a team where shipping matters." }),
  ).toBeVisible();
  await expect(page.getByText("Let us build something")).toHaveCount(0);

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to work" });
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Projects that shipped beyond the repo." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Quar.gr: GitHub" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Nero Website: Live" })).toBeVisible();
  await expect(page.getByText("Live in production")).toBeVisible();
  await expect(page.getByText("Public GitHub Pages")).toBeVisible();

  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(horizontalOverflow).toBeLessThanOrEqual(2);

  for (let step = 0; step < 18; step += 1) {
    await page.mouse.wheel(0, 850);
    await page.waitForTimeout(80);
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
        { timeout: 10_000 },
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

  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(canonical).toBe("https://dimosthenisgkontolias.com");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://dimosthenisgkontolias.com/images/og-card.png",
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    "https://dimosthenisgkontolias.com/images/og-card.png",
  );
  const ogImageResponse = await request.get("/images/og-card.png");
  expect(ogImageResponse.ok()).toBe(true);
  expect(ogImageResponse.headers()["content-type"]).toContain("image/png");
  const ogImageBytes = await ogImageResponse.body();
  expect([...ogImageBytes.slice(0, 4)]).toEqual([137, 80, 78, 71]);

  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText()) as {
    "@graph": Array<{
      "@type"?: string;
      award?: string[];
      itemListElement?: Array<{
        item?: {
          image?: string;
          name?: string;
        };
      }>;
      knowsLanguage?: string[];
    }>;
  };
  const schemaTypes = schema["@graph"].map((node) => node["@type"]);
  expect(schemaTypes).toEqual(expect.arrayContaining(["Person", "WebSite", "ItemList"]));
  const person = schema["@graph"].find((node) => node["@type"] === "Person");
  expect(person?.knowsLanguage).toEqual(expect.arrayContaining(["Greek", "English", "German"]));
  expect(person?.award).toEqual(
    expect.arrayContaining(["Panhellenic exams: 19,150/20,000", "Hackathon finals: 2x finalist"]),
  );
  const itemList = schema["@graph"].find((node) => node["@type"] === "ItemList");
  expect(itemList?.itemListElement?.length).toBeGreaterThanOrEqual(9);
  const neroProject = itemList?.itemListElement
    ?.map((entry) => entry.item)
    .find((item) => item?.name === "Nero Website");
  expect(neroProject?.image).toBe("https://dimosthenisgkontolias.com/images/projects/nero.webp");

  const robotsResponse = await request.get("/robots.txt");
  expect(await robotsResponse.text()).toContain(
    "Sitemap: https://dimosthenisgkontolias.com/sitemap.xml",
  );
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(await sitemapResponse.text()).toContain("https://dimosthenisgkontolias.com");
  const manifestResponse = await request.get("/manifest.webmanifest");
  const manifest = (await manifestResponse.json()) as {
    icons?: Array<{ src?: string }>;
    name?: string;
    theme_color?: string;
  };
  expect(manifest.name).toBe("Dimosthenis Gkontolias Portfolio");
  expect(manifest.theme_color).toBe("#174332");
  expect(manifest.icons?.some((icon) => icon.src === "/icon.png?v=2")).toBe(true);

  const unnamedInteractiveCount = await page.evaluate(
    () =>
      Array.from(document.querySelectorAll("a,button")).filter((element) => {
        const label =
          element.textContent?.trim() ||
          element.getAttribute("aria-label") ||
          element.getAttribute("title");
        return !label;
      }).length,
  );
  expect(unnamedInteractiveCount).toBe(0);

  if (testInfo.project.name === "mobile") {
    await page.getByLabel("Open navigation").click();
    const creatorLink = page.getByRole("link", { name: "Creator" }).last();
    await expect(creatorLink).toBeVisible();
    await creatorLink.click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: "I build the thing, then explain it in Greek." }),
    ).toBeVisible();
  }

  expect(consoleErrors).toEqual([]);
});
