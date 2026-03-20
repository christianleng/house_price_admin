import type { IAdminMutationService } from "@/00-domain/ports";
import { adminMutationService } from "@/01-adapters/http/HttpAdminAdapter";
import { enqueue } from "./mutationQueue";

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
