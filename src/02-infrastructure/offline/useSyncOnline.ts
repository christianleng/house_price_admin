import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getAll, dequeue } from "@/02-infrastructure/offline/mutationQueue";
import { adminService } from "@/01-adapters/http/HttpAdminAdapter";
import { ADMIN_KEYS } from "@/02-infrastructure/react-query/adminHooks";

export function useSyncOnline() {
  const queryClient = useQueryClient();

  useEffect(() => {
    async function flushQueue() {
      if (!navigator.onLine) return;

      const pending = await getAll();
      if (pending.length === 0) return;

      console.group(`🔄 [SyncOnline] Replaying ${pending.length} mutation(s)`);

      for (const mutation of pending) {
        try {
          console.log("⏳ replaying propertyId:", mutation.propertyId);
          const updated = await adminService.updateProperty(
            mutation.propertyId,
            mutation.payload,
          );
          await dequeue(mutation.id);
          queryClient.setQueryData(
            ADMIN_KEYS.propertyDetail(mutation.propertyId),
            updated,
          );
          queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.properties() });
          console.log("✅ synced:", mutation.propertyId);
        } catch (error) {
          console.error("❌ failed to replay:", mutation.propertyId, error);
          // On arrête — on ne dequeue pas, on réessaiera au prochain "online"
          break;
        }
      }

      console.groupEnd();
    }

    // Au retour en ligne
    window.addEventListener("online", flushQueue);
    // Au montage — si on était déjà en ligne avec des mutations en attente
    flushQueue();

    return () => window.removeEventListener("online", flushQueue);
  }, [queryClient]);
}
