import { test, expect } from "@playwright/test";

test.describe("AlertsSection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("affiche au moins une alerte", async ({ page }) => {
    const alerts = page.locator("[data-testid='alert-item']");
    await expect(alerts.first()).toBeVisible();
  });

  test("affiche l'alerte DPE si des biens F/G existent", async ({ page }) => {
    const dpeAlert = page.locator("[data-testid='alert-item']").filter({
      hasText: /DPE F/,
    });
    await expect(dpeAlert).toBeVisible();
  });

  test("affiche le CTA 'Voir les biens' sur l'alerte DPE", async ({ page }) => {
    const cta = page.locator("[data-testid='alert-cta']").filter({
      hasText: "Voir les biens",
    });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute(
      "href",
      "/properties?transaction_type=rent&energy_rating=F",
    );
  });

  test("affiche l'alerte photos catalogue complet", async ({ page }) => {
    const photoAlert = page.locator("[data-testid='alert-item']").filter({
      hasText: /annonce.*photo/,
    });
    await expect(photoAlert).toBeVisible();
  });
});
