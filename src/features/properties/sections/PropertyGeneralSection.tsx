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
import { Textarea } from "@/shared/ui/textarea";
import type { FC } from "react";
import {
  Controller,
  type Control,
  type UseFormRegister,
} from "react-hook-form";

interface PropertyGeneralSectionProps {
  control: Control<UpdatePropertyPayload>;
  register: UseFormRegister<UpdatePropertyPayload>;
}

const PropertyGeneralSection: FC<PropertyGeneralSectionProps> = ({
  control,
  register,
}) => {
  return (
    <Section title="Informations générales">
      <FieldGroup>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="title">Titre</FieldLabel>
            <Input id="title" className="h-8 text-xs" {...register("title")} />
          </Field>

          <Field>
            <FieldLabel htmlFor="transactionType">
              Type de transaction
            </FieldLabel>
            <Controller
              name="transactionType"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="transactionType" className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">Vente</SelectItem>
                    <SelectItem value="rent">Location</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="propertyType">Type de bien</FieldLabel>
            <Input
              id="propertyType"
              className="h-8 text-xs"
              {...register("propertyType")}
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            className="text-xs min-h-24 resize-none"
            {...register("description")}
          />
        </Field>
      </FieldGroup>
    </Section>
  );
};

export default PropertyGeneralSection;
