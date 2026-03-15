import { get, set, del, keys, createStore } from "idb-keyval";
import type { UpdatePropertyPayload } from "@/00-domain/entities";

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
  | { type: "updateProperty"; propertyId: string; payload: UpdatePropertyPayload }
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

  console.group(`🔴 [OfflineQueue] Mutation enqueued — ${mutation.type}`);
  console.log("propertyId:", mutation.propertyId);
  if (mutation.type === "updateProperty") console.log("payload:", mutation.payload);
  console.log("mutationId:", mutation.id);
  console.log("queuedAt:", new Date(mutation.queuedAt).toISOString());
  console.groupEnd();

  window.dispatchEvent(new Event("mutation-queue-changed"));

  return mutation;
}

/**
 * Supprime une mutation de la queue après sync réussi.
 */
export async function dequeue(mutationId: string): Promise<void> {
  await del(buildKey(mutationId), store);
  window.dispatchEvent(new Event("mutation-queue-changed"));
}

/**
 * Retourne toutes les mutations en attente, triées par date.
 */
export async function getAll(): Promise<QueuedMutation[]> {
  const allKeys = await keys(store);
  const mutations = await Promise.all(
    allKeys.map((key) => get<QueuedMutation>(key, store)),
  );
  const sorted = mutations
    .filter((m): m is QueuedMutation => m !== undefined)
    .sort((a, b) => a.queuedAt - b.queuedAt);

  console.group("📦 [OfflineQueue] Queue state");
  console.log("pending mutations:", sorted.length);
  console.table(
    sorted.map((m) => ({
      id: m.id,
      type: m.type,
      propertyId: m.propertyId,
      queuedAt: new Date(m.queuedAt).toISOString(),
    })),
  );
  console.groupEnd();

  return sorted;
}

/**
 * Vide entièrement la queue (utile pour les tests).
 */
export async function clearQueue(): Promise<void> {
  const allKeys = await keys(store);
  await Promise.all(allKeys.map((key) => del(key, store)));
}
