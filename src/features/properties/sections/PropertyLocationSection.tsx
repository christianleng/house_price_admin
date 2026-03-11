import type { UpdatePropertyPayload } from "@/00-domain/entities";
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Section } from "@/shared/ui/section";
import type { FC } from "react";
import type { UseFormRegister } from "react-hook-form";

interface PropertyLocationSectionProps {
  register: UseFormRegister<UpdatePropertyPayload>;
}

const PropertyLocationSection: FC<PropertyLocationSectionProps> = ({
  register,
}) => {
  return (
    <Section title="Localisation">
      <FieldGroup>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="address">Adresse</FieldLabel>
            <Input
              id="address"
              className="h-8 text-xs"
              {...register("address")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="city">Ville</FieldLabel>
            <Input id="city" className="h-8 text-xs" {...register("city")} />
          </Field>
          <Field>
            <FieldLabel htmlFor="postalCode">Code postal</FieldLabel>
            <Input
              id="postalCode"
              className="h-8 text-xs"
              {...register("postalCode")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="neighborhood">Quartier</FieldLabel>
            <Input
              id="neighborhood"
              className="h-8 text-xs"
              {...register("neighborhood")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="district">
              Arrondissement / District
            </FieldLabel>
            <Input
              id="district"
              className="h-8 text-xs"
              {...register("district")}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-xs">
          <Field>
            <FieldLabel htmlFor="latitude">Latitude</FieldLabel>
            <Input
              id="latitude"
              type="number"
              step="any"
              className="h-8 text-xs"
              {...register("latitude", { valueAsNumber: true })}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="longitude">Longitude</FieldLabel>
            <Input
              id="longitude"
              type="number"
              step="any"
              className="h-8 text-xs"
              {...register("longitude", { valueAsNumber: true })}
            />
          </Field>
        </div>
      </FieldGroup>
    </Section>
  );
};

export default PropertyLocationSection;
