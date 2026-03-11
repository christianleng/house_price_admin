import type { UpdatePropertyPayload } from "@/00-domain/entities";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Section } from "@/shared/ui/section";
import type { FC } from "react";
import {
  Controller,
  useWatch,
  type Control,
  type UseFormRegister,
} from "react-hook-form";

interface PropertyAmenitiesSectionProps {
  control: Control<UpdatePropertyPayload>;
  register: UseFormRegister<UpdatePropertyPayload>;
}

const PropertyAmenitiesSection: FC<PropertyAmenitiesSectionProps> = ({
  control,
  register,
}) => {
  const hasParking = useWatch({ control, name: "hasParking" });

  return (
    <Section title="Équipements">
      <FieldSet>
        <FieldLegend variant="label">
          Sélectionnez les équipements disponibles
        </FieldLegend>
        <FieldGroup>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {(
              [
                ["hasElevator", "Ascenseur"],
                ["hasBalcony", "Balcon"],
                ["hasTerrace", "Terrasse"],
                ["hasGarden", "Jardin"],
                ["hasParking", "Parking"],
                ["hasCave", "Cave"],
              ] as const
            ).map(([key, label]) => (
              <Field key={key} orientation="horizontal">
                <Controller
                  name={key}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id={key}
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <FieldLabel htmlFor={key}>{label}</FieldLabel>
              </Field>
            ))}
          </div>

          {hasParking && (
            <Field className="max-w-40">
              <FieldLabel htmlFor="parkingSpaces">Places de parking</FieldLabel>
              <Input
                id="parkingSpaces"
                type="number"
                className="h-8 text-xs"
                {...register("parkingSpaces", { valueAsNumber: true })}
              />
            </Field>
          )}
        </FieldGroup>
      </FieldSet>
    </Section>
  );
};

export default PropertyAmenitiesSection;
