import { test, expect } from "@playwright/test";
import { loginAsTestUser } from "./helpers/auth";
import { addDocument, deleteAllDocuments, daysFromNow } from "./helpers/documents";

test.describe("Document Management", () => {
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

  test("User can add a new document", async ({ page }) => {
    await addDocument(page, {
      visaType: "H-1B",
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 150,
    });

    await page.goto("/dashboard");
    // Card exists
    await expect(page.locator(".rounded-2xl.border.p-6").first()).toBeVisible({ timeout: 10000 });
    // Total Documents count is at least 1
    const countEl = page.locator(".rounded-2xl.border.p-5").first().locator(".font-mono.font-extrabold");
    await expect(countEl).not.toHaveText("0");
  });

  test("User can delete a document", async ({ page }) => {
    await addDocument(page, { expiryDaysFromNow: 200 });
    await page.goto("/dashboard");

    // Count cards before
    const cardsBefore = await page.locator(".rounded-2xl.border.p-6").count();
    expect(cardsBefore).toBeGreaterThan(0);

    // Accept confirm dialog and click delete
    page.on("dialog", (d) => d.accept());
    await page.getByLabel("Delete document").first().click();
    await page.waitForTimeout(1000);

    const cardsAfter = await page.locator(".rounded-2xl.border.p-6").count();
    expect(cardsAfter).toBeLessThan(cardsBefore);
  });

  test("Document countdown shows correct days remaining", async ({ page }) => {
    await addDocument(page, {
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 90,
    });

    await page.goto("/dashboard");
    // The SVG ring center shows "90" or near it (may be 89-91 due to timezone)
    const dayText = page.locator(".font-mono.text-xs.font-bold").first();
    await expect(dayText).toContainText(/8[89]|90|91/);
  });

  test("Free tier user sees upgrade prompt at 3 documents", async ({ page }) => {
    // Add 3 documents
    for (let i = 0; i < 3; i++) {
      await addDocument(page, { expiryDaysFromNow: 200 + i * 10 });
      await page.goto("/dashboard");
    }

    // The Add Document button should show upgrade prompt or limit notice
    await expect(
      page.getByText(/free plan limit reached/i)
        .or(page.getByText(/upgrade/i).first())
    ).toBeVisible({ timeout: 10000 });
  });

  test("Add Document modal shows visa type selection step", async ({ page }) => {
    await page.getByRole("button", { name: /add document/i }).click();
    await expect(page.getByRole("heading", { name: /add document/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /^H-1B$/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /^F-1$/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Green Card$/ })).toBeVisible();
  });

  test("Add Document modal closes on backdrop click", async ({ page }) => {
    await page.getByRole("button", { name: /add document/i }).click();
    await expect(page.getByRole("heading", { name: /add document/i })).toBeVisible();

    // Click backdrop
    await page.locator(".bg-midnight\\/80").click({ force: true });
    await expect(page.getByRole("heading", { name: /add document/i })).not.toBeVisible();
  });

  test("Edit document pre-fills existing values", async ({ page }) => {
    await addDocument(page, {
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 150,
    });
    await page.goto("/dashboard");

    // Click edit button
    await page.getByLabel("Edit document").first().click();
    await expect(page.getByRole("heading", { name: /edit document/i })).toBeVisible();

    // Expiry date should be pre-filled
    const dateInput = page.locator('input[type="date"]');
    await expect(dateInput).not.toHaveValue("");
  });
});
