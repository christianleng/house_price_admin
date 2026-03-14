import { ENERGY_RATINGS } from "@/00-domain/constants/property/property";
import type { UpdatePropertyPayload } from "@/00-domain/entities";
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Section } from "@/shared/ui/section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import type { FC } from "react";
import {
  Controller,
  type Control,
  type UseFormRegister,
} from "react-hook-form";

interface PropertyDpeSectionProps {
  control: Control<UpdatePropertyPayload>;
  register: UseFormRegister<UpdatePropertyPayload>;
}

const PropertyDpeSection: FC<PropertyDpeSectionProps> = ({
  control,
  register,
}) => {
  return (
    <Section title="DPE & Chauffage">
      <FieldGroup>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="energyRating">
              Classe énergétique (DPE)
            </FieldLabel>
            <Controller
              name="energyRating"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="energyRating" className="h-8 text-xs">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {ENERGY_RATINGS.map((r) => (
                      <SelectItem key={r} value={r}>
                        DPE {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="heatingType">Type de chauffage</FieldLabel>
            <Input
              id="heatingType"
              className="h-8 text-xs"
              {...register("heatingType")}
            />
          </Field>
        </div>
      </FieldGroup>
    </Section>
  );
};

export default PropertyDpeSection;
