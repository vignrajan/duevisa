import { Page, expect } from "@playwright/test";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../.env.test") });

export const AUTH_FILE = path.join(__dirname, "../.auth/user.json");
export const PRO_AUTH_FILE = path.join(__dirname, "../.auth/pro-user.json");

export function getTestCredentials() {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;
  if (!email || !password) {
    throw new Error(
      "TEST_USER_EMAIL and TEST_USER_PASSWORD must be set in tests/e2e/.env.test"
    );
  }
  return { email, password };
}

export function getProTestCredentials() {
  const email = process.env.TEST_PRO_USER_EMAIL;
  const password = process.env.TEST_PRO_USER_PASSWORD;
  if (!email || !password) {
    throw new Error(
      "TEST_PRO_USER_EMAIL and TEST_PRO_USER_PASSWORD must be set in tests/e2e/.env.test"
    );
  }
  return { email, password };
}

export async function loginAsTestUser(page: Page): Promise<void> {
  const { email, password } = getTestCredentials();
  await page.goto("/login");
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole("button", { name: /sign in/i }).click();
  await page.waitForURL(/\/dashboard/, { timeout: 15000 });
}

export async function loginAsProUser(page: Page): Promise<void> {
  const { email, password } = getProTestCredentials();
  await page.goto("/login");
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole("button", { name: /sign in/i }).click();
  await page.waitForURL(/\/dashboard/, { timeout: 15000 });
}

export async function logoutUser(page: Page): Promise<void> {
  // Try sidebar logout button (desktop)
  const sidebarLogout = page.getByRole("button", { name: /sign out/i });
  if (await sidebarLogout.isVisible()) {
    await sidebarLogout.click();
  } else {
    // Mobile — logout icon button in header
    await page.locator("header button").last().click();
  }
  await page.waitForURL(/\/(login|$)/, { timeout: 10000 });
}

export async function saveAuthState(page: Page, filePath: string): Promise<void> {
  await page.context().storageState({ path: filePath });
}

/** Skip test with a clear message when credentials are not configured */
export function skipIfNoCredentials(
  email: string | undefined,
  password: string | undefined,
  label = "test"
): void {
  if (!email || !password) {
    // Using console.warn since skip() must be called inside a test block
    console.warn(`Skipping ${label} test: credentials not configured in .env.test`);
  }
}
