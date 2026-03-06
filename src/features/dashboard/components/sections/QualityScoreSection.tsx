import { useGlobalStats } from "@/02-infrastructure/react-query/adminHooks";
import type { QualityScore } from "@/00-domain/entities";

const CRITERIA: {
  key: keyof Omit<QualityScore, "globalScore">;
  label: string;
  icon: string;
}[] = [
  { key: "photos", label: "Photos", icon: "📸" },
  { key: "description", label: "Description", icon: "📝" },
  { key: "price", label: "Prix renseigné", icon: "💶" },
  { key: "energyRating", label: "DPE renseigné", icon: "⚡" },
  { key: "surface", label: "Surface m²", icon: "📐" },
] as const;

function getScoreClasses(score: number): { bar: string; text: string } {
  if (score >= 90)
    return { bar: "bg-status-success", text: "text-status-success" };
  if (score >= 70)
    return { bar: "bg-status-warning", text: "text-status-warning" };
  return { bar: "bg-status-error", text: "text-status-error" };
}

function getGlobalScoreClasses(score: number): string {
  if (score >= 90)
    return "text-status-success bg-alert-success-bg border-alert-success-border";
  if (score >= 70)
    return "text-status-warning bg-alert-warn-bg border-alert-warn-border";
  return "text-status-error bg-alert-urgent-bg border-alert-urgent-border";
}

export function QualityScoreSection() {
  const { data: stats } = useGlobalStats();
  const qs = stats.qualityScore;

  return (
    <div className="rounded-sm shadow-sidebar-active bg-card p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold">Score qualité du catalogue</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          État actuel — {stats.active} biens actifs
        </p>
      </div>

      <div className="space-y-3 mb-4">
        {CRITERIA.map(({ key, label, icon }) => {
          const score = qs[key];
          const { bar, text } = getScoreClasses(score);
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="text-base w-5 shrink-0">{icon}</span>
              <span className="text-xs text-muted-foreground w-28 shrink-0">
                {label}
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${bar}`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <span
                className={`text-xs font-bold tabular-nums w-10 text-right shrink-0 ${text}`}
              >
                {score}%
              </span>
            </div>
          );
        })}
      </div>

      <div
        className={`flex items-center justify-between rounded-sm border px-4 py-3 ${getGlobalScoreClasses(qs.globalScore)}`}
      >
        <span className="text-xs font-semibold">Score global</span>
        <span className="text-xl font-bold tabular-nums">
          {qs.globalScore} / 100
        </span>
      </div>
    </div>
  );
}
