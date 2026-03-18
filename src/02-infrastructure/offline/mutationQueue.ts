import { get, set, del, keys, createStore } from "idb-keyval";
import type { UpdatePropertyPayload } from "@/00-domain/entities";
import { emitQueueChanged } from "./queueEvents";

// ── Store dédié — isolation du reste d'IndexedDB ──────────────────────────────
const store = createStore("house-price-admin", "mutation-queue");

// ── Types ─────────────────────────────────────────────────────────────────────

export type QueuedMutation =
  | {
      type: "updateProperty";
      id: string;
      propertyId: string;
      payload: UpdatePropertyPayload;
      queuedAt: number;
    }
  | {
      type: "deleteProperty";
      id: string;
      propertyId: string;
      queuedAt: number;
    };

type MutationInput =
  | {
      type: "updateProperty";
      propertyId: string;
      payload: UpdatePropertyPayload;
    }
  | { type: "deleteProperty"; propertyId: string };

function buildKey(mutationId: string): string {
  return `mutation:${mutationId}`;
}

// ── API publique ──────────────────────────────────────────────────────────────

/**
 * Ajoute une mutation en attente dans IndexedDB.
 * Retourne le QueuedMutation créé.
 */
export async function enqueue(input: MutationInput): Promise<QueuedMutation> {
  const base = {
    id: crypto.randomUUID(),
    propertyId: input.propertyId,
    queuedAt: Date.now(),
  };

  const mutation: QueuedMutation =
    input.type === "updateProperty"
      ? { ...base, type: "updateProperty", payload: input.payload }
      : { ...base, type: "deleteProperty" };

  await set(buildKey(mutation.id), mutation, store);
  emitQueueChanged();
  return mutation;
}

/**
 * Supprime une mutation de la queue après sync réussi.
 */
export async function dequeue(mutationId: string): Promise<void> {
  await del(buildKey(mutationId), store);
  emitQueueChanged();
}

/**
 * Retourne toutes les mutations en attente, triées par date.
 */
export async function getAll(): Promise<QueuedMutation[]> {
  const allKeys = await keys(store);
  const mutations = await Promise.all(
    allKeys.map((key) => get<QueuedMutation>(key, store)),
  );
  return mutations
    .filter((m): m is QueuedMutation => m !== undefined)
    .sort((a, b) => a.queuedAt - b.queuedAt);
}

/**
 * Vide entièrement la queue (utile pour les tests).
 */
export async function clearQueue(): Promise<void> {
  const allKeys = await keys(store);
  await Promise.all(allKeys.map((key) => del(key, store)));
}
