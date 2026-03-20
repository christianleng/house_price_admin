import { useWatch, type Control } from "react-hook-form";
import type { UpdatePropertyPayload } from "@/00-domain/entities";
import type { FC } from "react";
import { getPropertyStatus } from "@/00-domain/use-cases/properties/getPropertyStatus";
import { PROPERTY_STATUS_STYLES } from "@/shared/utils/propertyStatus";

interface PropertyStatusBadgeProps {
  control: Control<UpdatePropertyPayload>;
}

const PropertyStatusBadge: FC<PropertyStatusBadgeProps> = ({ control }) => {
  const isActive = useWatch({ control, name: "isActive" });
  const status = getPropertyStatus(isActive ?? false);
  const { className, label } = PROPERTY_STATUS_STYLES[status];

  return (
    <span
      className={`flex pt-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      <div>{label}</div>
    </span>
  );
};

export default PropertyStatusBadge;
