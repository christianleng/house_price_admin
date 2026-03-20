import { IconLoader2 } from "@tabler/icons-react";

export default function AppLoader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background">
      <IconLoader2 className="size-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Chargement...</p>
    </div>
  );
}
