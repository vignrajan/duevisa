import { test, expect } from "@playwright/test";
import { loginAsTestUser } from "./helpers/auth";

test.describe("Family Tracking", () => {
  test.beforeEach(async ({ page }) => {
    test.skip(
      !process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD,
      "Credentials not set"
    );
    await loginAsTestUser(page);
  });

  test("Family page loads without errors", async ({ page }) => {
    await page.goto("/dashboard/family");
    // Should not redirect away or show an error
    await expect(page).toHaveURL(/\/dashboard\/family/);
    // Page renders some content
    await expect(page.locator("body")).not.toBeEmpty();
  });

  test("Family page shows Add Family Member option", async ({ page }) => {
    await page.goto("/dashboard/family");
    await expect(
      page.getByRole("button", { name: /add family member/i })
        .or(page.getByText(/add family member/i).first())
    ).toBeVisible({ timeout: 10000 });
  });

  test("User can add a family member", async ({ page }) => {
    await page.goto("/dashboard/family");

    // Open add modal or form
    await page.getByRole("button", { name: /add family member/i }).click();

    // Fill in name
    const nameInput = page.locator('input[type="text"]').first();
    await nameInput.fill("Jane Doe");

    // Select relationship
    const relSelect = page.locator("select").first();
    await relSelect.selectOption({ index: 1 });

    // Select visa
    const visaSelect = page.locator("select").nth(1);
    await visaSelect.selectOption({ index: 1 });

    // Submit
    await page.getByRole("button", { name: /add|save/i }).last().click();

    // Family member card appears
    await expect(page.getByText("Jane Doe")).toBeVisible({ timeout: 10000 });
  });

  test("Dashboard sidebar links to family page", async ({ page }) => {
    await page.goto("/dashboard");
    const familyLink = page.getByRole("link", { name: /family members/i });
    await expect(familyLink).toBeVisible();
    await familyLink.click();
    await expect(page).toHaveURL(/\/dashboard\/family/);
  });
});
