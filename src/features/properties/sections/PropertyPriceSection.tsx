import { TRANSACTION_TYPES } from "@/00-domain/constants/property/property";
import type { UpdatePropertyPayload } from "@/00-domain/entities";
import { Checkbox } from "@/shared/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Section } from "@/shared/ui/section";
import type { FC } from "react";
import {
  Controller,
  type Control,
  type UseFormRegister,
  type UseFormWatch,
} from "react-hook-form";

interface PropertyPriceSectionProps {
  control: Control<UpdatePropertyPayload>;
  register: UseFormRegister<UpdatePropertyPayload>;
  watch: UseFormWatch<UpdatePropertyPayload>;
}

const PropertyPriceSection: FC<PropertyPriceSectionProps> = ({
  control,
  register,
  watch,
}) => {
  const transactionType = watch("transactionType");

  return (
    <Section title="Prix">
      <FieldGroup>
        {transactionType === TRANSACTION_TYPES.SALE ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="price">Prix de vente (€)</FieldLabel>
              <Input
                id="price"
                type="number"
                className="h-8 text-xs"
                {...register("price", { valueAsNumber: true })}
              />
            </Field>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="rentPriceMonthly">
                Loyer mensuel (€)
              </FieldLabel>
              <Input
                id="rentPriceMonthly"
                type="number"
                className="h-8 text-xs"
                {...register("rentPriceMonthly", { valueAsNumber: true })}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="deposit">Dépôt de garantie (€)</FieldLabel>
              <Input
                id="deposit"
                type="number"
                className="h-8 text-xs"
                {...register("deposit", { valueAsNumber: true })}
              />
            </Field>
            <div className="flex items-end pb-1">
              <Field orientation="horizontal">
                <Controller
                  name="chargesIncluded"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="chargesIncluded"
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <FieldLabel htmlFor="chargesIncluded">
                  Charges incluses
                </FieldLabel>
              </Field>
            </div>
          </div>
        )}
      </FieldGroup>
    </Section>
  );
};

export default PropertyPriceSection;
