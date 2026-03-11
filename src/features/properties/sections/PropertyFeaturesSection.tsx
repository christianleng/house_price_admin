import type { UpdatePropertyPayload } from "@/00-domain/entities";
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Section } from "@/shared/ui/section";
import type { FC } from "react";
import type { UseFormRegister } from "react-hook-form";

interface PropertyFeaturesSectionProps {
  register: UseFormRegister<UpdatePropertyPayload>;
}

const PropertyFeaturesSection: FC<PropertyFeaturesSectionProps> = ({
  register,
}) => {
  return (
    <Section title="Caractéristiques">
      <FieldGroup>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(
            [
              ["surfaceArea", "Surface (m²)", "number"],
              ["rooms", "Pièces", "number"],
              ["bedrooms", "Chambres", "number"],
              ["bathrooms", "Salles de bain", "number"],
              ["toilets", "Toilettes", "number"],
              ["floors", "Étages (immeuble)", "number"],
              ["floorNumber", "Étage du bien", "number"],
              ["constructionYear", "Année de construction", "number"],
              ["availableFrom", "Disponible à partir du", "date"],
            ] as const
          ).map(([key, label, type]) => (
            <Field key={key}>
              <FieldLabel htmlFor={key}>{label}</FieldLabel>
              <Input
                id={key}
                type={type}
                className="h-8 text-xs"
                {...register(
                  key,
                  type === "number" ? { valueAsNumber: true } : {},
                )}
              />
            </Field>
          ))}
        </div>
      </FieldGroup>
    </Section>
  );
};

export default PropertyFeaturesSection;
