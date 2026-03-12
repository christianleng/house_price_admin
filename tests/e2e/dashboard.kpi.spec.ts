import { test, expect } from "@playwright/test";

test.describe("KpiRowSection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page
      .locator("[data-testid='kpi-card']")
      .first()
      .waitFor({ state: "visible" });
  });

  test("affiche les 5 KPI cards", async ({ page }) => {
    const cards = page.locator("[data-testid='kpi-card']");
    await expect(cards).toHaveCount(5);
  });

  test("la card Total propriétés affiche une valeur numérique", async ({
    page,
  }) => {
    const card = page.locator("[data-kpi-title='Total propriétés']");
    await expect(card).toBeVisible();
    const value = card.locator("p.text-3xl");
    await expect(value).toHaveText(/^\d+$/);
  });

  test("la card À la vente affiche une valeur numérique", async ({ page }) => {
    const card = page.locator("[data-kpi-title='À la vente']");
    await expect(card).toBeVisible();
    const value = card.locator("p.text-3xl");
    await expect(value).toHaveText(/^\d+$/);
  });

  test("la card À la location affiche une valeur numérique", async ({
    page,
  }) => {
    const card = page.locator("[data-kpi-title='À la location']");
    await expect(card).toBeVisible();
    const value = card.locator("p.text-3xl");
    await expect(value).toHaveText(/^\d+$/);
  });

  test("la card Délai moyen vente affiche une valeur en jours", async ({
    page,
  }) => {
    const card = page.locator("[data-kpi-title='Délai moyen vente']");
    await expect(card).toBeVisible();
    const value = card.locator("p.text-3xl");
    await expect(value).toHaveText(/^\d+j$|^—$/);
  });

  test("la card Disponibles sous 30j affiche une valeur numérique", async ({
    page,
  }) => {
    const card = page.locator("[data-kpi-title='Disponibles sous 30j']");
    await expect(card).toBeVisible();
    const value = card.locator("p.text-3xl");
    await expect(value).toHaveText(/^\d+$/);
  });

  test("la card Total affiche le sous-titre avec actives et inactives", async ({
    page,
  }) => {
    const card = page.locator("[data-kpi-title='Total propriétés']");
    const subtitle = card.locator("p.text-xs.text-muted-foreground");
    await expect(subtitle).toHaveText(/\d+ actives · \d+ inactives/);
  });

  test("la card À la vente affiche le prix moyen", async ({ page }) => {
    const card = page.locator("[data-kpi-title='À la vente']");
    const subtitle = card.locator("p.text-xs.text-muted-foreground");
    await expect(subtitle).toHaveText(/Moy\./);
  });
});
