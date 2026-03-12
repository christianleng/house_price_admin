import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RecentSection } from "./sections/RecentSection";
import { StagnantSection } from "./sections/StagnantSection";
import { QualityScoreSection } from "./sections/QualityScoreSection";
import { AlertsSection } from "./sections/AlertsSection";
import { KpiRowSection } from "./sections/KpiRowSection";
import { KpiSkeleton } from "@/shared/ui/KpiCard";
import { Skeleton } from "@/shared/ui/skeleton";
import { CityPerformanceSection } from "./sections/CityPerformanceSection";

function SectionError({ title }: { title: string }) {
  return (
    <div className="rounded-sm border border-alert-urgent-border bg-alert-urgent-bg p-4 text-sm text-status-error">
      Impossible de charger {title}
    </div>
  );
}

function KpiGroupSkeleton() {
  return (
    <div className="kpi-group">
      {Array.from({ length: 8 }).map((_, i) => (
        <KpiSkeleton key={i} />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="px-6 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vue d'ensemble du portefeuille immobilier
        </p>
      </div>

      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <AlertsSection />
        </Suspense>
      </ErrorBoundary>

      <div className="dashboard-layout">
        <div className="area-kpi">
          <ErrorBoundary fallback={<SectionError title="les KPIs" />}>
            <Suspense fallback={<KpiGroupSkeleton />}>
              <KpiRowSection />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="area-recent">
          <ErrorBoundary
            fallback={<SectionError title="les dernières propriétés" />}
          >
            <Suspense
              fallback={<Skeleton className="h-64 w-full rounded-sm" />}
            >
              <RecentSection />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="area-stagnant">
          <ErrorBoundary
            fallback={<SectionError title="les biens stagnants" />}
          >
            <Suspense
              fallback={<Skeleton className="h-48 w-full rounded-sm" />}
            >
              <StagnantSection />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="area-quality-score">
          <ErrorBoundary fallback={<SectionError title="le score qualité" />}>
            <Suspense
              fallback={<Skeleton className="h-48 w-full rounded-sm" />}
            >
              <QualityScoreSection />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="area-cities">
          <ErrorBoundary
            fallback={<SectionError title="la performance par ville" />}
          >
            <Suspense
              fallback={<Skeleton className="h-64 w-full rounded-sm" />}
            >
              <CityPerformanceSection />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
