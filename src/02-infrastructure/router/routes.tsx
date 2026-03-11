import RootErrorBoundary from "@/shared/pages/RootErrorBoundary";
import RootLayout from "../../app/layouts/RootLayout";
import { ProtectedLayout } from "@/features/auth/components/ProtectedLayout";
import { queryClient } from "../react-query/queryClient";
import {
  adminPropertiesQuery,
  citiesPerformanceQuery,
  globalStatsQuery,
  monthlyStatsQuery,
} from "../react-query/adminHooks";
import { recentPropertiesQuery } from "../react-query/propertyHooks";
import { filtersFromParams } from "@/shared/utils/propertyFilters";
import type { LoaderFunctionArgs } from "react-router";

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
            loader: () => {
              queryClient.prefetchQuery(globalStatsQuery);
              queryClient.prefetchQuery(monthlyStatsQuery(6));
              queryClient.prefetchQuery(recentPropertiesQuery(5));
              queryClient.prefetchQuery(citiesPerformanceQuery);
              return null;
            },
            lazy: async () => {
              const m =
                await import("@/features/dashboard/components/DashboardPage");
              return { Component: m.default };
            },
          },
          {
            path: "properties",
            loader: ({ request }: LoaderFunctionArgs) => {
              const url = new URL(request.url);
              queryClient.prefetchQuery(
                adminPropertiesQuery(filtersFromParams(url.searchParams)),
              );
              return null;
            },
            lazy: async () => {
              const m =
                await import("@/features/properties/components/PropertyListPage");
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
