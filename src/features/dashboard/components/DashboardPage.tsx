import { useRecentProperties } from "@/02-infrastructure/react-query/propertyHooks";
import {
  useGlobalStats,
  useMonthlyStats,
} from "@/02-infrastructure/react-query/adminHooks";
import { EvolutionSection } from "./sections/EvolutionSection";
import { DistributionSection } from "./sections/DistributionSection";
import { RecentSection } from "./sections/RecentSection";
import { PortfolioSection } from "./sections/PortfolioSection";
import { QualitySection } from "./sections/QualitySection";

export default function DashboardPage() {
  const { data: stats, isLoading: loadingStats } = useGlobalStats();
  const { data: monthly, isLoading: loadingMonthly } = useMonthlyStats(6);
  const { data: recentData, isLoading: loadingRecent } = useRecentProperties(5);

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

      <div className="dashboard-layout">
        <div className="area-kpi-portfolio">
          <PortfolioSection
            stats={stats}
            monthly={monthly}
            loadingStats={loadingStats}
          />
        </div>
        <div className="area-kpi-quality">
          <QualitySection stats={stats} loadingStats={loadingStats} />
        </div>

        <div className="area-evolution">
          <EvolutionSection monthly={monthly} loadingMonthly={loadingMonthly} />
        </div>

        <div className="area-distrib">
          <DistributionSection stats={stats} loadingStats={loadingStats} />
        </div>

        <div className="area-recent">
          <RecentSection
            items={recentData?.items}
            loadingRecent={loadingRecent}
          />
        </div>
      </div>
    </div>
  );
}
