/// <reference types="vitest/config" />
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // Le Service Worker s'enregistre automatiquement
      registerType: "autoUpdate",

      // Fichiers à precacher au premier chargement
      includeAssets: ["vite.svg"],

      manifest: {
        name: "House Price Admin",
        short_name: "PropAdmin",
        description: "Administration des biens immobiliers",
        theme_color: "#1e3a5f",
        background_color: "#0f1f35",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "vite.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },

      workbox: {
        // SPA — sert index.html pour toutes les navigations offline
        navigateFallback: "/index.html",

        // Stratégie NetworkFirst pour les requêtes API —
        // tente le réseau, fallback sur le cache si offline
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*\/api\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24h
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],

        // Précache tous les assets buildés (index.html, JS, CSS)
        // → résout ERR_INTERNET_DISCONNECTED au refresh
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
      },

      // En dev, active le SW pour pouvoir tester offline
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
