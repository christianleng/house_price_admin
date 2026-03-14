import type { PhotoDetail } from "@/00-domain/entities";
import { Section } from "@/shared/ui/section";

interface PropertyPhotosSectionProps {
  photos: PhotoDetail[];
}

const PropertyPhotosSection = ({ photos }: PropertyPhotosSectionProps) => {
  if (photos.length === 0) return null;

  return (
    <Section title={`Photos (${photos.length})`}>
      <div className="flex flex-wrap gap-3">
        {photos.map((photo) => (
          <div key={photo.id} className="relative">
            <img
              src={photo.url}
              alt=""
              className="w-24 h-16 object-cover rounded-lg border border-border"
            />
            {photo.isPrimary && (
              <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                Principal
              </span>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default PropertyPhotosSection;
