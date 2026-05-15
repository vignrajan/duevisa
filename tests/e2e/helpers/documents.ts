import { Page } from "@playwright/test";

export interface AddDocumentOptions {
  visaType?: string;
  /** Exact text of the option in the document type dropdown (partial match OK) */
  documentTypeLabel?: string;
  /** Days from today for the expiry date */
  expiryDaysFromNow?: number;
  /** Custom label override */
  label?: string;
}

/** Returns an ISO date string (yyyy-MM-dd) N days from today */
export function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

/**
 * Adds a document via the dashboard modal.
 * Assumes the user is already on /dashboard.
 */
export async function addDocument(
  page: Page,
  options: AddDocumentOptions = {}
): Promise<void> {
  const {
    visaType = "H-1B",
    documentTypeLabel = "I-797 Petition Approval",
    expiryDaysFromNow = 150,
  } = options;

  const expiryDate = daysFromNow(expiryDaysFromNow);

  // Open modal
  await page.getByRole("button", { name: /add document/i }).click();

  // Step 1 — visa type selection
  await page.getByRole("button", { name: new RegExp(`^${visaType}$`) }).click();

  // Step 2 — document type select
  await page.locator("select").selectOption({ label: new RegExp(documentTypeLabel, "i") });

  // Fill expiry date (id is "expiry-date" in AddDocumentModal)
  await page.locator('input[type="date"]').fill(expiryDate);

  // Submit
  await page.getByRole("button", { name: /add document/i }).click();

  // Wait for modal to close
  await page.waitForSelector('[aria-label="Close modal"]', { state: "hidden", timeout: 10000 }).catch(() => {});
}

/**
 * Deletes all documents on the dashboard by clicking each trash icon.
 * Uses browser confirm dialogs — page.on("dialog") must be set up before calling this
 * or the helper sets it up internally.
 */
export async function deleteAllDocuments(page: Page): Promise<void> {
  // Auto-accept confirm dialogs
  page.on("dialog", (dialog) => dialog.accept());

  let attempts = 0;
  while (attempts < 20) {
    const deleteBtn = page.getByLabel("Delete document").first();
    if (!(await deleteBtn.isVisible().catch(() => false))) break;
    await deleteBtn.click();
    await page.waitForTimeout(500);
    attempts++;
  }
}
