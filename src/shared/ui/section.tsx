import { cn } from "@/shared/utils";

interface SectionProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({
  title,
  description,
  className,
  children,
}: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(
        "rounded-xl bg-card border border-border shadow-sm p-6 space-y-5",
        className,
      )}
    >
      <div className="space-y-0.5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {title}
        </h2>
        {description && (
          <p className="text-xs text-muted-foreground font-normal">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
