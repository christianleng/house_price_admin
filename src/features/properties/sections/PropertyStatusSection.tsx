import type { UpdatePropertyPayload } from "@/00-domain/entities";
import { Checkbox } from "@/shared/ui/checkbox";
import { FieldGroup, Field, FieldLabel } from "@/shared/ui/field";
import { Section } from "@/shared/ui/section";
import type { FC } from "react";
import { Controller, type Control } from "react-hook-form";

interface PropertyStatusSectionProps {
  control: Control<UpdatePropertyPayload>;
}

const PropertyStatusSection: FC<PropertyStatusSectionProps> = ({ control }) => {
  return (
    <Section title="Statut">
      <FieldGroup>
        <Field orientation="horizontal">
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="isActive"
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <FieldLabel htmlFor="isActive">
            Bien actif (visible sur le site)
          </FieldLabel>
        </Field>

        <Field orientation="horizontal">
          <Controller
            name="isFurnished"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="isFurnished"
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <FieldLabel htmlFor="isFurnished">Meublé</FieldLabel>
        </Field>
      </FieldGroup>
    </Section>
  );
};

export default PropertyStatusSection;
