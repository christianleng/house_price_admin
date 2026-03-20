import { RecentSection } from "../sections/RecentSection";
import { StagnantSection } from "../sections/StagnantSection";
import { QualityScoreSection } from "../sections/QualityScoreSection";
import { AlertsSection } from "../sections/AlertsSection";
import { KpiRowSection } from "../sections/KpiRowSection";
import { CityPerformanceSection } from "../sections/CityPerformanceSection";
import { AsyncSection } from "@/shared/ui/AsyncSection";
import {
  AlertsSkeleton,
  KpiGroupSkeleton,
  SectionSkeleton,
} from "./DashboardSkeletons";

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

      <AsyncSection fallback={<AlertsSkeleton />}>
        <AlertsSection />
      </AsyncSection>

      <div className="dashboard-layout">
        <div className="area-kpi">
          <AsyncSection fallback={<KpiGroupSkeleton />} errorTitle="les KPIs">
            <KpiRowSection />
          </AsyncSection>
        </div>

        <div className="area-recent">
          <AsyncSection
            fallback={<SectionSkeleton contentHeight="h-52" />}
            errorTitle="les dernières propriétés"
          >
            <RecentSection />
          </AsyncSection>
        </div>

        <div className="area-stagnant">
          <AsyncSection
            fallback={<SectionSkeleton contentHeight="h-40" />}
            errorTitle="les biens stagnants"
          >
            <StagnantSection />
          </AsyncSection>
        </div>

        <div className="area-quality-score">
          <AsyncSection
            fallback={<SectionSkeleton contentHeight="h-40" />}
            errorTitle="le score qualité"
          >
            <QualityScoreSection />
          </AsyncSection>
        </div>

        <div className="area-cities">
          <AsyncSection
            fallback={<SectionSkeleton contentHeight="h-52" />}
            errorTitle="la performance par ville"
          >
            <CityPerformanceSection />
          </AsyncSection>
        </div>
      </div>
    </div>
  );
}
