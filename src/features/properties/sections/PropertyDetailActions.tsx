import { useFormState } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { UpdatePropertyPayload } from "@/00-domain/entities";
import { Button } from "@/shared/ui/button";
import { IconCheck, IconLoader2, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState, type FC } from "react";

interface PropertyDetailActionsProps {
  control: Control<UpdatePropertyPayload>;
  isSaving: boolean;
  onCancel: () => void;
}

const PropertyDetailActions: FC<PropertyDetailActionsProps> = ({
  control,
  isSaving,
  onCancel,
}) => {
  const { isDirty } = useFormState({ control });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const wasSaving = useRef(false);

  useEffect(() => {
    if (wasSaving.current && !isSaving) {
      const timer = setTimeout(() => {
        setSaveSuccess(true);
        const resetTimer = setTimeout(() => setSaveSuccess(false), 3000);
        return () => clearTimeout(resetTimer);
      }, 0);
      return () => clearTimeout(timer);
    }
    wasSaving.current = isSaving;
  }, [isSaving]);

  return (
    <>
      {isDirty && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 text-xs text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
          onClick={() => onCancel()}
        >
          <IconX className="size-3.5 mr-1" />
          Annuler
        </Button>
      )}
      <Button
        type="submit"
        size="sm"
        className="h-8 text-xs bg-primary-foreground text-primary hover:bg-primary-foreground/90"
        disabled={!isDirty || isSaving}
      >
        {isSaving ? (
          <IconLoader2 className="size-3.5 mr-1 animate-spin" />
        ) : saveSuccess ? (
          <IconCheck className="size-3.5 mr-1 text-status-success" />
        ) : null}
        {saveSuccess ? "Enregistré" : "Enregistrer"}
      </Button>
    </>
  );
};

export default PropertyDetailActions;
