import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAll, dequeue } from "@/02-infrastructure/offline/mutationQueue";
import { adminMutationService } from "@/01-adapters/http/HttpAdminAdapter";
import { ApiError } from "@/01-adapters/http/ApiError";
import { ADMIN_KEYS } from "@/02-infrastructure/react-query/adminHooks";

export function useSyncOnline() {
  const queryClient = useQueryClient();

  useEffect(() => {
    async function flushQueue() {
      if (!navigator.onLine) return;

      const pending = await getAll();
      if (pending.length === 0) return;

      let syncedCount = 0;

      for (const mutation of pending) {
        try {
          if (mutation.type === "updateProperty") {
            const updated = await adminMutationService.updateProperty(
              mutation.propertyId,
              mutation.payload,
            );
            await dequeue(mutation.id);
            queryClient.setQueryData(
              ADMIN_KEYS.propertyDetail(mutation.propertyId),
              updated,
            );
          } else {
            await adminMutationService.deleteProperty(mutation.propertyId);
            await dequeue(mutation.id);
            queryClient.removeQueries({
              queryKey: ADMIN_KEYS.propertyDetail(mutation.propertyId),
            });
          }

          queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.properties() });
          syncedCount++;
        } catch (error) {
          // Erreur 4xx : payload invalide, on discard la mutation
          if (error instanceof ApiError && error.isClientError) {
            await dequeue(mutation.id);
          } else {
            // Erreur réseau ou 5xx : on arrête et on réessaiera au prochain online
            break;
          }
        }
      }

      if (syncedCount > 0) {
        toast.success(
          syncedCount === 1
            ? "Modification synchronisée"
            : `${syncedCount} modifications synchronisées`,
          {
            description: "Vos changements ont été enregistrés sur le serveur.",
          },
        );
      }
    }

    window.addEventListener("online", flushQueue);
    flushQueue();

    return () => window.removeEventListener("online", flushQueue);
  }, [queryClient]);
}
