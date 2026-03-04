import RootErrorBoundary from "@/shared/pages/RootErrorBoundary";
import RootLayout from "../../app/layouts/RootLayout";
import { ProtectedLayout } from "@/features/auth/components/ProtectedLayout";

export const routes = [
  {
    path: "/",
    Component: () => <ProtectedLayout />,
    HydrateFallback: () => <div className="min-h-screen bg-white" />,
    ErrorBoundary: RootErrorBoundary,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            index: true,
            lazy: async () => {
              const m =
                await import("@/features/dashboard/components/DashboardPage");
              return { Component: m.default };
            },
          },
          {
            path: "*",
            lazy: async () => {
              const m = await import("@/shared/pages/NotFoundPage");
              return { Component: m.default };
            },
          },
        ],
      },
    ],
  },
  {
    path: "auth/login",
    lazy: async () => {
      const module = await import("@/features/auth/components/LoginPage");
      return { Component: module.default };
    },
  },
];
