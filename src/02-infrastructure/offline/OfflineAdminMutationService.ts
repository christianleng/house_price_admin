import type { IAdminMutationService } from "@/00-domain/ports";
import { adminMutationService } from "@/01-adapters/http/HttpAdminAdapter";
import { enqueue } from "./mutationQueue";

/**
 * Wrapper offline-aware autour de adminMutationService.
 *
 * Si une mutation échoue hors ligne, elle est enregistrée dans la queue
 * IndexedDB pour être rejouée au retour de la connexion.
 * Les hooks React Query n'ont plus besoin de connaître la mutation queue.
 */
export const offlineAdminMutationService: IAdminMutationService = {
  async updateProperty(id, payload) {
    try {
      return await adminMutationService.updateProperty(id, payload);
    } catch (error) {
      if (!navigator.onLine) {
        await enqueue({ type: "updateProperty", propertyId: id, payload });
      }
      throw error;
    }
  },

  async deleteProperty(id) {
    try {
      await adminMutationService.deleteProperty(id);
    } catch (error) {
      if (!navigator.onLine) {
        await enqueue({ type: "deleteProperty", propertyId: id });
      }
      throw error;
    }
  },
};
