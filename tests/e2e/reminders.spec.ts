import { test, expect } from "@playwright/test";
import { loginAsTestUser } from "./helpers/auth";
import { addDocument, deleteAllDocuments } from "./helpers/documents";

/**
 * Reminder stage is determined by daysRemaining vs the document's renewLeadDays.
 * For I-797 (H-1B petition) renewLeadDays = 180.
 * Stages: 180d → 90d → 60d → 30d → 7d
 */
test.describe("Reminder Stage Labels", () => {
  test.beforeEach(async ({ page }) => {
    test.skip(
      !process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD,
      "Credentials not set"
    );
    await loginAsTestUser(page);
    await page.goto("/dashboard");
  });

  test.afterEach(async ({ page }) => {
    await page.goto("/dashboard");
    await deleteAllDocuments(page);
  });

  test("Document at 185 days shows Good Standing badge (outside window)", async ({ page }) => {
    await addDocument(page, {
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 185,
    });
    await page.goto("/dashboard");
    await expect(page.locator(".badge-good")).toBeVisible({ timeout: 10000 });
  });

  test("Document at 150 days shows Action Needed badge (inside 180-day window)", async ({ page }) => {
    await addDocument(page, {
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 150,
    });
    await page.goto("/dashboard");
    await expect(page.locator(".badge-warning")).toBeVisible({ timeout: 10000 });
  });

  test("Document at 89 days shows Action Needed badge", async ({ page }) => {
    await addDocument(page, {
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 89,
    });
    await page.goto("/dashboard");
    await expect(
      page.locator(".badge-warning").or(page.locator(".badge-critical")).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test("Document at 29 days shows Critical badge", async ({ page }) => {
    await addDocument(page, {
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 29,
    });
    await page.goto("/dashboard");
    await expect(page.locator(".badge-critical")).toBeVisible({ timeout: 10000 });
  });

  test("Document at 6 days shows Critical badge and alert banner", async ({ page }) => {
    await addDocument(page, {
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 6,
    });
    await page.goto("/dashboard");

    await expect(page.locator(".badge-critical")).toBeVisible({ timeout: 10000 });

    // Critical alert banner at top of dashboard
    await expect(
      page.getByText(/need immediate attention/i)
    ).toBeVisible();
  });

  test("EAD calculator shows correct 5-stage timeline", async ({ page }) => {
    await page.goto("/");
    const input = page.locator("#ead-expiry");

    // 150 days → stage 1 of 5 (inside 180-day window, beyond 90)
    await input.fill(
      new Date(Date.now() + 150 * 86400000).toISOString().split("T")[0]
    );
    await expect(page.getByText(/1 of 5/i)).toBeVisible({ timeout: 5000 });
  });
});
