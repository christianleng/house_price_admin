import RootErrorBoundary from "@/pages/errors/RootErrorBoundary";
import RootLayout from "../layouts/RootLayout";
import { RequireAuth } from "@/core/presentation/auth/components/RequireAuth";

export const routes = [
  {
    path: "/",
    Component: () => (
      <RequireAuth>
        <RootLayout />
      </RequireAuth>
    ),
    HydrateFallback: () => <div className="min-h-screen bg-white" />,
    ErrorBoundary: RootErrorBoundary,
    children: [
      {
        index: true,
        lazy: async () => {
          const module = await import("@/pages/Home");
          return { Component: module.default };
        },
      },
      {
        path: "*",
        lazy: async () => {
          const module = await import("@/pages/errors/NotFound");
          return { Component: module.default };
        },
      },
    ],
  },
  {
    path: "auth/login",
    lazy: async () => {
      const module = await import("@/pages/auth/Login");
      return { Component: module.default };
    },
  },
];
