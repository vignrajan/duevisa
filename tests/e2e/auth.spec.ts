import { test, expect } from "@playwright/test";
import { loginAsTestUser, logoutUser } from "./helpers/auth";

test.describe("Authentication", () => {
  test("Homepage loads and shows correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/DueVisa/i);
    await expect(page.getByRole("heading", { name: /never miss an/i })).toBeVisible();
  });

  test("User can sign up with email", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.getByRole("heading", { name: /create account/i })).toBeVisible();

    const uniqueEmail = `test+${Date.now()}@example.com`;
    await page.locator('input[type="text"]').fill("Test User");
    await page.locator('input[type="email"]').fill(uniqueEmail);
    await page.locator('input[type="password"]').fill("TestPassword123!");
    await page.getByRole("button", { name: /create free account/i }).click();

    // Either redirects to dashboard/onboarding, or shows "Check your email"
    await expect(
      page.getByRole("heading", { name: /check your email/i })
        .or(page.getByRole("heading", { name: /what visa type/i }))
        .or(page.locator("text=Good morning, Good afternoon, Good evening").first())
    ).toBeVisible({ timeout: 15000 });

    // No error messages
    await expect(page.locator("text=error").first()).not.toBeVisible();
  });

  test("User can log in with email", async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    test.skip(!email || !password, "TEST_USER_EMAIL / TEST_USER_PASSWORD not set");

    await page.goto("/login");
    await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();

    await page.locator('input[type="email"]').fill(email!);
    await page.locator('input[type="password"]').fill(password!);
    await page.getByRole("button", { name: /sign in/i }).click();

    await page.waitForURL(/\/dashboard/, { timeout: 15000 });
    await expect(page.locator("text=/Good (morning|afternoon|evening)/")).toBeVisible();
  });

  test("Unauthenticated user is redirected to login from dashboard", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForURL(/\/login/, { timeout: 10000 });
    await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
  });

  test("User can log out", async ({ page }) => {
    test.skip(
      !process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD,
      "Credentials not set"
    );

    await loginAsTestUser(page);
    await page.waitForURL(/\/dashboard/);

    await logoutUser(page);

    // Should be back on home or login
    await expect(page).toHaveURL(/\/(login)?$/);

    // Dashboard is no longer accessible
    await page.goto("/dashboard");
    await page.waitForURL(/\/login/);
  });
});
