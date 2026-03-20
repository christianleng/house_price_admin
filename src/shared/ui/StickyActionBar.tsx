import { IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/shared/ui/button";
import { useFormState, type Control } from "react-hook-form";
import type { UpdatePropertyPayload } from "@/00-domain/entities";

interface StickyActionBarProps {
  control: Control<UpdatePropertyPayload>;
  isSaving: boolean;
  onCancel: () => void;
  label?: string;
  cancelLabel?: string;
  saveLabel?: string;
}

export function StickyActionBar({
  control,
  isSaving,
  onCancel,
  label = "Modifications non enregistrées",
  cancelLabel = "Annuler",
  saveLabel = "Enregistrer",
}: StickyActionBarProps) {
  const { isDirty } = useFormState({ control });

  if (!isDirty) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-card border border-border shadow-lg rounded-full px-5 py-2.5">
        <span className="text-xs text-muted-foreground">{label}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
        <Button
          type="submit"
          size="sm"
          className="h-7 text-xs"
          disabled={!isDirty || isSaving}
        >
          {isSaving && <IconLoader2 className="size-3.5 mr-1 animate-spin" />}
          {saveLabel}
        </Button>
      </div>
    </div>
  );
}
