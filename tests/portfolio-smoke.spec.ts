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

  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(horizontalOverflow).toBeLessThanOrEqual(2);

  for (let step = 0; step < 18; step += 1) {
    await page.mouse.wheel(0, 850);
    await page.waitForTimeout(80);
  }
  await page.waitForLoadState("networkidle");

  const brokenImages = await page.evaluate(() =>
    Array.from(document.images)
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src),
  );
  expect(brokenImages).toEqual([]);

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

  const schema = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  ) as { "@graph": Array<{ "@type"?: string; itemListElement?: unknown[] }> };
  const schemaTypes = schema["@graph"].map((node) => node["@type"]);
  expect(schemaTypes).toEqual(expect.arrayContaining(["Person", "WebSite", "ItemList"]));
  const itemList = schema["@graph"].find((node) => node["@type"] === "ItemList");
  expect(itemList?.itemListElement?.length).toBeGreaterThanOrEqual(9);

  const robotsResponse = await request.get("/robots.txt");
  expect(await robotsResponse.text()).toContain(
    "Sitemap: https://dimosthenisgkontolias.com/sitemap.xml",
  );
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(await sitemapResponse.text()).toContain("https://dimosthenisgkontolias.com");

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
    await expect(page.getByRole("link", { name: "Creator" }).last()).toBeVisible();
  }

  expect(consoleErrors).toEqual([]);
});
