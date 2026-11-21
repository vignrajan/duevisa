import { test, expect } from "@playwright/test";

const URL = "/tools/h1b-grace-period-calculator";

test.describe("H-1B Grace Period Calculator", () => {
  test("page loads with inputs and citation", async ({ page }) => {
    await page.goto(URL);
    await expect(page).toHaveTitle(/grace period/i);
    await expect(page.getByRole("heading", { name: /h-1b grace period calculator/i })).toBeVisible();
    await expect(page.locator("#last-day")).toBeVisible();
    await expect(page.locator("#i94-expiry")).toBeVisible();
    // Rule is cited on the page
    await expect(page.getByText(/8 CFR 214\.1\(l\)\(2\)/).first()).toBeVisible();
    // Disclaimer is present
    await expect(page.getByText(/not legal advice\. Talk to an immigration attorney/i)).toBeVisible();
  });

  test("60-day rule governs when the I-94 is later", async ({ page }) => {
    await page.goto(URL);
    await page.locator("#last-day").fill("2026-01-01");
    await page.locator("#i94-expiry").fill("2027-01-01");

    // 2026-01-01 + 60 days = 2026-03-02, which is earlier than the 2027 I-94
    await expect(page.getByTestId("grace-end-date")).toHaveText("March 2, 2026");
    await expect(page.getByTestId("governing-rule")).toContainText(/60-day rule/i);
  });

  test("I-94 governs when it expires before day 60", async ({ page }) => {
    await page.goto(URL);
    await page.locator("#last-day").fill("2026-01-01");
    // I-94 expires Feb 1, 2026 — well before the 60-day mark (March 2, 2026)
    await page.locator("#i94-expiry").fill("2026-02-01");

    await expect(page.getByTestId("grace-end-date")).toHaveText("February 1, 2026");
    await expect(page.getByTestId("governing-rule")).toContainText(/I-94 expires before day 60/i);
  });

  test("works with only the last day of employment (no I-94)", async ({ page }) => {
    await page.goto(URL);
    await page.locator("#last-day").fill("2026-01-01");
    // No I-94 entered → falls back to the full 60 days
    await expect(page.getByTestId("grace-end-date")).toHaveText("March 2, 2026");
    await expect(page.getByTestId("governing-rule")).toContainText(/60-day rule/i);
  });

  test("shows the reminders conversion CTA under the result", async ({ page }) => {
    await page.goto(URL);
    await page.locator("#last-day").fill("2026-01-01");
    await page.locator("#i94-expiry").fill("2026-06-01");
    await expect(page.getByRole("button", { name: /get reminders before your grace period ends/i })).toBeVisible();
  });
});
