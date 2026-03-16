import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

function SectionError({ title }: { title: string }) {
  return (
    <div className="rounded-sm border border-alert-urgent-border bg-alert-urgent-bg p-4 text-sm text-status-error">
      Impossible de charger {title}
    </div>
  );
}

export function AsyncSection({
  children,
  fallback,
  errorTitle,
}: {
  children: ReactNode;
  fallback: ReactNode;
  errorTitle: string;
}) {
  return (
    <ErrorBoundary fallback={<SectionError title={errorTitle} />}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
