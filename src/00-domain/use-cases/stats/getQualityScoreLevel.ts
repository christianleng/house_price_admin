export type QualityScoreLevel = "good" | "warning" | "poor";

export function getQualityScoreLevel(score: number): QualityScoreLevel {
  if (score >= 90) return "good";
  if (score >= 70) return "warning";
  return "poor";
}
