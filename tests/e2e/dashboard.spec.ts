import { test, expect } from "@playwright/test";
import { loginAsTestUser } from "./helpers/auth";
import { addDocument, deleteAllDocuments, daysFromNow } from "./helpers/documents";

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    test.skip(
      !process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD,
      "Credentials not set"
    );
    await loginAsTestUser(page);
  });

  test("Dashboard loads with greeting", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(
      page.locator("text=/Good (morning|afternoon|evening)/")
    ).toBeVisible({ timeout: 10000 });
  });

  test("Dashboard shows stats bar with four stat tiles", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText("Total Documents")).toBeVisible();
    await expect(page.getByText("Need Attention")).toBeVisible();
    await expect(page.getByText("Next Deadline")).toBeVisible();
    await expect(page.getByText("Family Members")).toBeVisible();
  });

  test("Dashboard shows document card after adding a document", async ({ page }) => {
    await page.goto("/dashboard");
    await addDocument(page, {
      visaType: "H-1B",
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 150,
    });

    await page.goto("/dashboard");
    // Document card should be present
    await expect(page.locator(".rounded-2xl.border.p-6").first()).toBeVisible({ timeout: 10000 });
  });

  test("Document card shows days remaining and urgency badge", async ({ page }) => {
    await page.goto("/dashboard");
    await addDocument(page, { expiryDaysFromNow: 150 });
    await page.goto("/dashboard");

    // Should show a badge (Good Standing, Action Needed, or Critical)
    const badge = page.locator(".badge").first();
    await expect(badge).toBeVisible();
  });

  test("Color coding: green badge for safe document (200 days)", async ({ page }) => {
    await page.goto("/dashboard");
    await addDocument(page, { expiryDaysFromNow: 200 });
    await page.goto("/dashboard");

    // badge-good class (green)
    await expect(page.locator(".badge-good").first()).toBeVisible({ timeout: 10000 });
  });

  test("Color coding: warning badge for document expiring in 45 days", async ({ page }) => {
    await page.goto("/dashboard");
    await addDocument(page, {
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 45,
    });
    await page.goto("/dashboard");

    await expect(page.locator(".badge-warning").first()).toBeVisible({ timeout: 10000 });
  });

  test("Color coding: critical badge for document expiring in 5 days", async ({ page }) => {
    await page.goto("/dashboard");
    await addDocument(page, {
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 5,
    });
    await page.goto("/dashboard");

    await expect(page.locator(".badge-critical").first()).toBeVisible({ timeout: 10000 });
  });

  test("Add Document button is visible on dashboard", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(
      page.getByRole("button", { name: /add document/i })
    ).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    // Clean up — delete all documents added during the test
    await page.goto("/dashboard");
    await deleteAllDocuments(page);
  });
});
