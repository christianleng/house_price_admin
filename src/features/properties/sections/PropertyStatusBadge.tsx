import { useWatch, type Control } from "react-hook-form";
import type { UpdatePropertyPayload } from "@/00-domain/entities";
import type { FC } from "react";
import { getPropertyStatus } from "@/00-domain/use-cases/properties/getPropertyStatus";

interface PropertyStatusBadgeProps {
  control: Control<UpdatePropertyPayload>;
}

const PropertyStatusBadge: FC<PropertyStatusBadgeProps> = ({ control }) => {
  const isActive = useWatch({ control, name: "isActive" });
  const { className, label } = getPropertyStatus(isActive ?? false);

  return (
    <span
      className={`flex pt-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      <div>{label}</div>
    </span>
  );
};

export default PropertyStatusBadge;
