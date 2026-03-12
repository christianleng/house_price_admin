import { test as setup, expect } from "@playwright/test";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const STORAGE_STATE = path.join(__dirname, "../.auth/admin.json");

setup("authenticate as admin", async ({ page }) => {
  await page.goto("/auth/login");

  await page.getByLabel("Email").fill(process.env.TEST_ADMIN_EMAIL!);
  await page.getByLabel("Password").fill(process.env.TEST_ADMIN_PASSWORD!);
  await page.getByRole("button", { name: "Login", exact: true }).click();

  await page.waitForURL("/");
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  await page.context().storageState({ path: STORAGE_STATE });
});
