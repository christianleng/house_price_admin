import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  IconArrowLeft,
  IconBuilding,
  IconBuildingSkyscraper,
  IconLoader2,
  IconTrash,
} from "@tabler/icons-react";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import {
  useAdminProperty,
  useUpdateProperty,
  useDeleteProperty,
} from "@/02-infrastructure/react-query/adminHooks";
import { DPE_COLORS } from "@/shared/constants/dpe";
import { TRANSACTION_TYPES } from "@/shared/constants/property";
import type { UpdatePropertyPayload } from "@/00-domain/entities";
import { StickyActionBar } from "@/shared/ui/StickyActionBar";
import PropertyStatusSection from "../sections/PropertyStatusSection";
import PropertyGeneralSection from "../sections/PropertyGeneralSection";
import PropertyLocationSection from "../sections/PropertyLocationSection";
import PropertyPriceSection from "../sections/PropertyPriceSection";
import PropertyFeaturesSection from "../sections/PropertyFeaturesSection";
import PropertyAmenitiesSection from "../sections/PropertyAmenitiesSection";
import PropertyDpeSection from "../sections/PropertyDpeSection";
import PropertyPhotosSection from "../sections/PropertyPhotosSection";
import PropertyStatusBadge from "../sections/PropertyStatusBadge";
import PropertyDetailActions from "../sections/PropertyDetailActions";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: property } = useAdminProperty(id!);
  const { mutate: update, isPending: isSaving } = useUpdateProperty(id!);
  const { mutate: deleteProperty, isPending: isDeleting } = useDeleteProperty();

  const { register, handleSubmit, watch, control, reset } =
    useForm<UpdatePropertyPayload>({
      defaultValues: {
        title: property.title,
        description: property.description ?? "",
        address: property.address ?? "",
        neighborhood: property.neighborhood,
        city: property.city,
        district: property.district,
        postalCode: property.postalCode,
        latitude: property.latitude,
        longitude: property.longitude,
        price: property.price ?? undefined,
        rentPriceMonthly: property.rentPriceMonthly ?? undefined,
        deposit: property.deposit ?? undefined,
        chargesIncluded: property.chargesIncluded ?? false,
        transactionType: property.transactionType,
        propertyType: property.propertyType,
        surfaceArea: property.surfaceArea,
        rooms: property.rooms,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms ?? undefined,
        toilets: property.toilets ?? undefined,
        floors: property.floors ?? undefined,
        floorNumber: property.floorNumber ?? undefined,
        hasCave: property.hasCave ?? false,
        hasElevator: property.hasElevator,
        hasBalcony: property.hasBalcony,
        hasTerrace: property.hasTerrace,
        hasGarden: property.hasGarden,
        hasParking: property.hasParking,
        parkingSpaces: property.parkingSpaces ?? undefined,
        energyRating: property.energyRating ?? undefined,
        heatingType: property.heatingType ?? undefined,
        constructionYear: property.constructionYear ?? undefined,
        availableFrom: property.availableFrom ?? undefined,
        isFurnished: property.isFurnished ?? false,
        isActive: property.isActive,
      },
    });

  function onSubmit(data: UpdatePropertyPayload) {
    update(data);
  }

  function handleDelete() {
    deleteProperty(id!, {
      onSuccess: () => navigate("/properties"),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-h-full bg-background">
        <div
          className="px-8 pt-8 pb-6"
          style={{
            background:
              "linear-gradient(135deg, var(--primary) 0%, #1a5fa8 100%)",
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => navigate("/properties")}
                className="h-8 w-8 p-0 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              >
                <IconArrowLeft className="size-4" />
              </Button>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <IconBuildingSkyscraper className="size-3.5 text-primary-foreground/50" />
                  <span className="text-primary-foreground/50 text-xs font-medium uppercase tracking-widest">
                    Propriété
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-primary-foreground tracking-tight leading-tight">
                  {property.title}
                </h1>
                <p className="text-primary-foreground/50 text-xs mt-0.5 font-mono tracking-wide">
                  {property.reference} · {property.city}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <PropertyStatusBadge control={control} />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <IconTrash className="size-3.5 mr-1" />
                    Supprimer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Supprimer ce bien ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. Le bien{" "}
                      <strong>{property.title}</strong> sera définitivement
                      supprimé.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-status-error text-primary-foreground hover:bg-status-error-dark"
                    >
                      {isDeleting ? (
                        <IconLoader2 className="size-4 animate-spin" />
                      ) : (
                        "Supprimer"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <PropertyDetailActions
                control={control}
                isSaving={isSaving}
                onCancel={() => reset()}
              />
              {/* {isDirty && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => window.location.reload()}
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
              </Button> */}
            </div>
          </div>

          <div className="mt-5 flex gap-4 items-center">
            <div className="shrink-0 w-24 h-16 rounded-lg overflow-hidden bg-primary-foreground/10 flex items-center justify-center">
              {property.thumbnailUrl ? (
                <img
                  src={property.thumbnailUrl}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <IconBuilding className="size-7 text-primary-foreground/40" />
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-primary-foreground/15 text-primary-foreground border-primary-foreground/20 text-xs">
                {property.transactionType === TRANSACTION_TYPES.SALE
                  ? "Vente"
                  : "Location"}
              </Badge>
              <Badge className="bg-primary-foreground/15 text-primary-foreground border-primary-foreground/20 text-xs">
                {property.propertyType}
              </Badge>
              {property.energyRating && (
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-black ${
                    DPE_COLORS[
                      property.energyRating as keyof typeof DPE_COLORS
                    ] ?? "bg-primary-foreground/20 text-primary-foreground"
                  }`}
                >
                  {property.energyRating}
                </span>
              )}
              <span className="text-primary-foreground/50 text-xs self-center">
                {property.surfaceArea} m² · {property.rooms} pièces ·{" "}
              </span>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 space-y-4">
          <PropertyStatusSection control={control} />
          <PropertyGeneralSection control={control} register={register} />
          <PropertyLocationSection register={register} />
          <PropertyPriceSection
            control={control}
            register={register}
            watch={watch}
          />
          <PropertyFeaturesSection register={register} />

          <PropertyAmenitiesSection control={control} register={register} />
          <PropertyDpeSection control={control} register={register} />
          <PropertyPhotosSection photos={property.photos} />
        </div>

        <StickyActionBar
          control={control}
          isSaving={isSaving}
          onCancel={() => reset()}
        />
      </div>
    </form>
  );
}
