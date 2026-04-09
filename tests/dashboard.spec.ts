import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("homepage", () => {
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }, testInfo) => {
    const username = process.env.PLAYWRIGHT_USERNAME || "";
    const password = process.env.PLAYWRIGHT_PASSWORD || "";

    await page.goto(`${process.env.BASE_URL}`);
    await page.getByRole("textbox", { name: "Email address" }).fill(username);
    await page
      .getByRole("textbox", { name: "Password visibility" })
      .fill(password);
    await page.getByTestId("login-button").click();

    await page.waitForLoadState("networkidle");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: "application/json",
    });

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
