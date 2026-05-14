import { test, expect } from "@playwright/test";
import { loginAsTestUser } from "./helpers/auth";
import { daysFromNow } from "./helpers/documents";

test.describe("Onboarding", () => {
  test("Onboarding page renders visa selection step", async ({ page }) => {
    test.skip(
      !process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD,
      "Credentials not set"
    );

    await page.goto("/signup/onboarding");
    // Middleware redirects unauthenticated users — login first
    if (page.url().includes("/login")) {
      await loginAsTestUser(page);
      await page.goto("/signup/onboarding");
    }

    await expect(
      page.getByRole("heading", { name: /what visa type/i })
    ).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Step 1 of 4")).toBeVisible();
  });

  test("Onboarding shows document date inputs after visa selection", async ({ page }) => {
    test.skip(
      !process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD,
      "Credentials not set"
    );

    await page.goto("/signup/onboarding");
    if (page.url().includes("/login")) {
      await loginAsTestUser(page);
      await page.goto("/signup/onboarding");
    }

    // Select H-1B visa
    await page.getByRole("button", { name: /^H-1B$/ }).click();

    await expect(
      page.getByRole("heading", { name: /enter your document dates/i })
    ).toBeVisible();
    await expect(page.getByText("Step 2 of 4")).toBeVisible();

    // Passport expiry date input should exist
    const passportInput = page.locator('#expiry-passport');
    await expect(passportInput).toBeVisible();
  });

  test("User can complete onboarding and reach dashboard", async ({ page }) => {
    test.skip(
      !process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD,
      "Credentials not set"
    );

    await page.goto("/signup/onboarding");
    if (page.url().includes("/login")) {
      await loginAsTestUser(page);
      await page.goto("/signup/onboarding");
    }

    // Step 1 — select H-1B
    await page.getByRole("button", { name: /^H-1B$/ }).click();

    // Step 2 — fill passport expiry (required)
    await page.locator("#expiry-passport").fill(daysFromNow(400));
    await page.getByRole("button", { name: /next/i }).click();

    // Step 3 — skip family members
    await page.getByRole("button", { name: /next/i }).click();

    // Step 4 — confirm reminders, go to dashboard
    await page.getByRole("button", { name: /go to my dashboard/i }).click();

    await page.waitForURL(/\/dashboard/, { timeout: 15000 });
    await expect(page.locator("text=/Good (morning|afternoon|evening)/")).toBeVisible();
  });
});
