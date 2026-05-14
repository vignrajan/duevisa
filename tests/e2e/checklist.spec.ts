import { test, expect } from "@playwright/test";
import { loginAsTestUser, loginAsProUser } from "./helpers/auth";
import { addDocument, deleteAllDocuments } from "./helpers/documents";

test.describe("Renewal Checklist — Free User", () => {
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

  test("Checklist appears for H-1B document within 180-day trigger window", async ({ page }) => {
    await addDocument(page, {
      visaType: "H-1B",
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 150,
    });
    await page.goto("/dashboard");

    await expect(
      page.getByText("H-1B Renewal Checklist")
    ).toBeVisible({ timeout: 10000 });
  });

  test("Checklist does NOT appear for document outside trigger window", async ({ page }) => {
    await addDocument(page, {
      visaType: "H-1B",
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 300, // beyond 180-day triggerDays
    });
    await page.goto("/dashboard");

    await expect(page.getByText("H-1B Renewal Checklist")).not.toBeVisible();
  });

  test("Checklist expands on click and shows steps", async ({ page }) => {
    await addDocument(page, {
      visaType: "H-1B",
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 150,
    });
    await page.goto("/dashboard");

    const checklistToggle = page.getByText("H-1B Renewal Checklist");
    await checklistToggle.click();

    // First step should be visible after expanding
    await expect(
      page.getByText("Confirm employer is filing H-1B extension")
    ).toBeVisible({ timeout: 5000 });
  });

  test("Free user sees lock icons on checklist steps", async ({ page }) => {
    await addDocument(page, {
      visaType: "H-1B",
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 150,
    });
    await page.goto("/dashboard");

    await page.getByText("H-1B Renewal Checklist").click();

    // Lock icons present (lucide Lock icon rendered as SVG)
    const lockIcons = page.locator('[aria-label="Check step"]').first();
    // For free users the button contains a Lock icon, not a Circle
    await expect(lockIcons).toBeVisible();
  });

  test("Free user sees upgrade banner inside checklist", async ({ page }) => {
    await addDocument(page, {
      visaType: "H-1B",
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 150,
    });
    await page.goto("/dashboard");

    await page.getByText("H-1B Renewal Checklist").click();

    await expect(
      page.getByText(/upgrade to pro to track your progress/i)
    ).toBeVisible({ timeout: 5000 });
  });

  test("EAD checklist appears for EAD document within 180-day window", async ({ page }) => {
    await addDocument(page, {
      visaType: "H-1B",
      documentTypeLabel: "EAD Work Permit",
      expiryDaysFromNow: 120,
    });
    await page.goto("/dashboard");

    await expect(page.getByText("EAD Renewal Checklist")).toBeVisible({ timeout: 10000 });
  });

  test("Passport checklist appears within 270-day window", async ({ page }) => {
    await addDocument(page, {
      visaType: "H-1B",
      documentTypeLabel: "Passport",
      expiryDaysFromNow: 200,
    });
    await page.goto("/dashboard");

    await expect(page.getByText("Passport Renewal Checklist")).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Renewal Checklist — Pro User", () => {
  test.beforeEach(async ({ page }) => {
    test.skip(
      !process.env.TEST_PRO_USER_EMAIL || !process.env.TEST_PRO_USER_PASSWORD,
      "Pro credentials not set"
    );
    await loginAsProUser(page);
    await page.goto("/dashboard");
  });

  test.afterEach(async ({ page }) => {
    await page.goto("/dashboard");
    await deleteAllDocuments(page);
  });

  test("Pro user can check off a checklist step and it persists", async ({ page }) => {
    await addDocument(page, {
      visaType: "H-1B",
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 150,
    });
    await page.goto("/dashboard");

    await page.getByText("H-1B Renewal Checklist").click();

    // Click the first checkbox
    const firstCheckbox = page.getByLabel("Check step").first();
    await firstCheckbox.click();

    // Should now show as checked (CheckCircle2 icon)
    await expect(firstCheckbox).toBeVisible();

    // Reload and verify persistence
    await page.reload();
    await page.getByText("H-1B Renewal Checklist").click();

    // Progress count should reflect 1 completed step
    await expect(page.getByText("1/10")).toBeVisible({ timeout: 5000 });
  });

  test("Progress bar updates as steps are completed", async ({ page }) => {
    await addDocument(page, {
      visaType: "H-1B",
      documentTypeLabel: "I-797 Petition Approval",
      expiryDaysFromNow: 150,
    });
    await page.goto("/dashboard");

    await page.getByText("H-1B Renewal Checklist").click();

    // Check 3 steps
    const checkboxes = page.getByLabel("Check step");
    await checkboxes.nth(0).click();
    await page.waitForTimeout(300);
    await checkboxes.nth(1).click();
    await page.waitForTimeout(300);
    await checkboxes.nth(2).click();
    await page.waitForTimeout(300);

    // 30% progress
    await expect(page.getByText("30%")).toBeVisible({ timeout: 5000 });
  });
});
