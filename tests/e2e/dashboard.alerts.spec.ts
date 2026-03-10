import { test, expect } from "@playwright/test";

test.describe("AlertsSection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page
      .locator("[data-testid='alert-item']")
      .first()
      .waitFor({
        state: "visible",
        timeout: 10000,
      })
      .catch(() => {});
  });

  test("affiche au moins une alerte", async ({ page }) => {
    const alerts = page.locator("[data-testid='alert-item']");
    await expect(alerts.first()).toBeVisible();
  });

  test("affiche l'alerte DPE si des biens F/G existent", async ({ page }) => {
    const dpeAlert = page.locator("[data-testid='alert-item']").filter({
      hasText: /DPE [FG]/,
    });

    const count = await dpeAlert.count();
    if (count === 0) {
      test.skip(
        true,
        "Aucun bien DPE F/G dans les données — alerte non affichée",
      );
      return;
    }

    await expect(dpeAlert.first()).toBeVisible();
  });

  test("affiche le CTA 'Voir les biens' sur l'alerte DPE", async ({ page }) => {
    const dpeAlert = page.locator("[data-testid='alert-item']").filter({
      hasText: /DPE [FG]/,
    });

    const count = await dpeAlert.count();
    if (count === 0) {
      test.skip(true, "Aucun bien DPE F/G dans les données — CTA non affiché");
      return;
    }

    const cta = dpeAlert.first().locator("[data-testid='alert-cta']");
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute(
      "href",
      expect.stringContaining("energy_rating"),
    );
  });

  test("affiche l'alerte photos si des biens sans photos existent", async ({
    page,
  }) => {
    const photoAlert = page.locator("[data-testid='alert-item']").filter({
      hasText: /annonce.*photo/i,
    });

    const count = await photoAlert.count();
    if (count === 0) {
      test.skip(true, "Aucun bien sans photo — alerte non affichée");
      return;
    }

    await expect(photoAlert.first()).toBeVisible();
  });
});
