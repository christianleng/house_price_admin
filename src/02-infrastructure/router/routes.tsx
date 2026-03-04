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
            path: "properties",
            lazy: async () => {
              const m =
                await import("@/features/properties/components/PropertyListPage");
              return { Component: m.default };
            },
          },
          {
            path: "properties/new",
            lazy: async () => {
              const m =
                await import("@/features/properties/components/PropertyCreatePage");
              return { Component: m.default };
            },
          },
          {
            path: "properties/:id",
            lazy: async () => {
              const m =
                await import("@/features/properties/components/PropertyDetailPage");
              return { Component: m.default };
            },
          },
          {
            path: "properties/:id/edit",
            lazy: async () => {
              const m =
                await import("@/features/properties/components/PropertyEditPage");
              return { Component: m.default };
            },
          },

          {
            path: "profile",
            lazy: async () => {
              const m =
                await import("@/features/profile/components/ProfilePage");
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
