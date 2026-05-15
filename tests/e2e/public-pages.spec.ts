import { test, expect } from "@playwright/test";
import { daysFromNow } from "./helpers/documents";

test.describe("Public Pages", () => {
  test("Homepage loads with all key sections", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/DueVisa/i);
    await expect(page.getByRole("heading", { name: /never miss an/i })).toBeVisible();

    // Visa type pills
    await expect(page.getByText("H-1B")).toBeVisible();
    await expect(page.getByText("F-1")).toBeVisible();

    // How it works section
    await expect(page.getByText(/how it works/i)).toBeVisible();

    // Pricing section
    await expect(page.getByText(/simple pricing/i)).toBeVisible();

    // FAQ section
    await expect(page.getByText(/common questions/i)).toBeVisible();
  });

  test("EAD calculator renders and accepts a date", async ({ page }) => {
    await page.goto("/");

    // Find the EAD calculator section
    await expect(page.getByText(/check your ead/i)).toBeVisible();

    // Fill in a date 100 days from now
    const input = page.locator("#ead-expiry");
    await input.fill(daysFromNow(100));

    // Results should appear: days left tile
    await expect(page.getByText("Days left")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("180-day window")).toBeVisible();
    await expect(page.getByText("Stage")).toBeVisible();
  });

  test("EAD calculator shows 'Open now' when within 180 days", async ({ page }) => {
    await page.goto("/");

    const input = page.locator("#ead-expiry");
    await input.fill(daysFromNow(100)); // 100 days → window is open

    await expect(page.getByText("Open now")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("File I-765 now")).toBeVisible();
  });

  test("EAD calculator shows window open date when beyond 180 days", async ({ page }) => {
    await page.goto("/");

    const input = page.locator("#ead-expiry");
    await input.fill(daysFromNow(250)); // beyond 180-day window

    // Window not yet open — shows a date
    await expect(page.getByText(/opens in/i)).toBeVisible({ timeout: 5000 });
  });

  test("Pricing page loads with all three tiers", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByText("Free")).toBeVisible();
    await expect(page.getByText("Pro")).toBeVisible();
    await expect(page.getByText("Team")).toBeVisible();
    await expect(page.getByText("$0")).toBeVisible();
    await expect(page.getByText("$9")).toBeVisible();
    await expect(page.getByText("$29")).toBeVisible();
  });

  test("Attorneys page loads without errors", async ({ page }) => {
    await page.goto("/attorneys");
    await expect(page).toHaveURL(/\/attorneys/);
    await expect(page.locator("body")).not.toBeEmpty();
    // No crash / error boundary shown
    await expect(page.getByText(/error/i)).not.toBeVisible();
  });

  test("Blog index page loads and shows at least one post", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { name: /stay informed/i })).toBeVisible();
    // At least one "Read more" link present
    await expect(page.getByRole("link", { name: /read more/i }).first()).toBeVisible();
  });

  test("Blog post page loads with title", async ({ page }) => {
    await page.goto("/blog/ead-180-day-renewal-rule");
    // Post title or content heading should be visible
    await expect(page.locator("h1, h2").first()).toBeVisible({ timeout: 10000 });
    // Meta description exists
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveCount(1);
  });

  test("404 page shows for unknown routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist-xyz");
    // Next.js built-in 404 or custom page
    await expect(
      page.getByText(/404/i).or(page.getByText(/not found/i)).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test("Login page renders", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("Signup page renders", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.getByRole("heading", { name: /create account/i })).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test("Privacy policy page loads", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("Terms of service page loads", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});
