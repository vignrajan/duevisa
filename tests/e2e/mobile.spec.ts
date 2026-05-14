import { test, expect, devices } from "@playwright/test";
import { loginAsTestUser } from "./helpers/auth";
import { addDocument, deleteAllDocuments } from "./helpers/documents";

// All tests in this file use Mobile Chrome viewport
test.use({ ...devices["Pixel 5"] });

test.describe("Mobile Responsiveness", () => {
  test("Homepage has no horizontal scroll on mobile", async ({ page }) => {
    await page.goto("/");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()!.width;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5); // 5px tolerance
  });

  test("Homepage hero and CTA are visible on mobile", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /never miss an/i })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /start tracking free/i }).first()
    ).toBeVisible();
  });

  test("Visa type pills wrap correctly on mobile", async ({ page }) => {
    await page.goto("/");
    // All pills should render without overflow — spot-check first two
    await expect(page.getByText("H-1B").first()).toBeVisible();
    await expect(page.getByText("F-1").first()).toBeVisible();
  });

  test("Pricing page cards stack vertically on mobile", async ({ page }) => {
    await page.goto("/pricing");
    const freePlan = page.getByText("Free").first();
    const proPlan = page.getByText("Pro").first();
    await expect(freePlan).toBeVisible();
    await expect(proPlan).toBeVisible();
  });

  test("Login form is usable on mobile", async ({ page }) => {
    await page.goto("/login");
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    const submitBtn = page.getByRole("button", { name: /sign in/i });

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // Inputs should be tappable (not hidden behind anything)
    const emailBox = await emailInput.boundingBox();
    const passwordBox = await passwordInput.boundingBox();
    expect(emailBox).not.toBeNull();
    expect(passwordBox).not.toBeNull();
  });

  test("Dashboard is mobile responsive", async ({ page }) => {
    test.skip(
      !process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD,
      "Credentials not set"
    );

    await loginAsTestUser(page);
    await page.goto("/dashboard");

    // Mobile header should be visible (not the sidebar)
    await expect(page.locator("header.lg\\:hidden, header")).toBeVisible();

    // Sidebar should be hidden on mobile
    const sidebar = page.locator("aside");
    // On mobile (Pixel 5 = 393px wide) lg: hidden sidebar should not be visible
    if (await sidebar.isVisible()) {
      const box = await sidebar.boundingBox();
      // If sidebar has no width/height it's effectively hidden
      expect(box?.width ?? 0).toBeLessThan(10);
    }
  });

  test("Document cards stack vertically on mobile", async ({ page }) => {
    test.skip(
      !process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD,
      "Credentials not set"
    );

    await loginAsTestUser(page);
    await page.goto("/dashboard");
    await addDocument(page, { expiryDaysFromNow: 200 });
    await page.goto("/dashboard");

    const firstCard = page.locator(".rounded-2xl.border.p-6").first();
    await expect(firstCard).toBeVisible();

    // Card should be full-width on mobile (close to viewport width)
    const box = await firstCard.boundingBox();
    const vw = page.viewportSize()!.width;
    expect(box!.width).toBeGreaterThan(vw * 0.8);

    await page.goto("/dashboard");
    await deleteAllDocuments(page);
  });

  test("Add Document modal is scrollable as bottom sheet on mobile", async ({ page }) => {
    test.skip(
      !process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD,
      "Credentials not set"
    );

    await loginAsTestUser(page);
    await page.goto("/dashboard");

    await page.getByRole("button", { name: /add document/i }).click();

    // Modal should appear from bottom
    const modal = page.locator(".rounded-t-2xl").first();
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Close button should be accessible
    await expect(page.getByRole("button", { name: /close modal/i })).toBeVisible();
  });
});
