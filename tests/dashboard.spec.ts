import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";
import * as path from "path";

test.describe("Achieving WCAG Standard with Playwright Accessibility Tests", () => {
  test("Accessibility Scan", async ({ page }, testInfo) => {
    await test.step("Login to brightsafe", async () => {
      const username: string = process.env.PLAYWRIGHT_USERNAME || "";
      const password: string = process.env.PLAYWRIGHT_PASSWORD || "";

      await page.goto(`${process.env.BASE_URL}`);
      await page.getByRole("textbox", { name: "Email address" }).fill(username);
      await page
        .getByRole("textbox", { name: "Password visibility" })
        .fill(password);
      await page.getByTestId("login-button").click();
    });

    await test.step("Run accessibility checks", async () => {
      await page.waitForLoadState("networkidle");

      const axeResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();

      const reportDir: string = "test-results/axe-core-reports";
      const reportPath: string = path.join(
        reportDir,
        `accessibility-report.html`,
      );

      createHtmlReport({
        results: axeResults,
        options: {
          outputDir: reportDir,
          reportFileName: `accessibility-report.html`,
        },
      });

      await testInfo.attach(`accessibility-report`, {
        path: reportPath,
        contentType: "text/html",
      });

      expect(axeResults.violations).toHaveLength(0);
    });
  });
});
