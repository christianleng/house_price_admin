import { get, set, del, keys, createStore } from "idb-keyval";
import type { UpdatePropertyPayload } from "@/00-domain/entities";

// ── Store dédié — isolation du reste d'IndexedDB ──────────────────────────────
const store = createStore("house-price-admin", "mutation-queue");

export interface QueuedMutation {
  id: string;
  propertyId: string;
  payload: UpdatePropertyPayload;
  queuedAt: number;
}

function buildKey(mutationId: string): string {
  return `update-property:${mutationId}`;
}

// ── API publique ──────────────────────────────────────────────────────────────

/**
 * Ajoute une mutation en attente dans IndexedDB.
 * Retourne le QueuedMutation créé.
 */
export async function enqueue(
  propertyId: string,
  payload: UpdatePropertyPayload,
): Promise<QueuedMutation> {
  const mutation: QueuedMutation = {
    id: crypto.randomUUID(),
    propertyId,
    payload,
    queuedAt: Date.now(),
  };
  await set(buildKey(mutation.id), mutation, store);

  console.group("🔴 [OfflineQueue] Mutation enqueued");
  console.log("propertyId:", propertyId);
  console.log("payload:", payload);
  console.log("mutationId:", mutation.id);
  console.log("queuedAt:", new Date(mutation.queuedAt).toISOString());
  console.groupEnd();

  return mutation;
}

/**
 * Supprime une mutation de la queue après sync réussi.
 */
export async function dequeue(mutationId: string): Promise<void> {
  await del(buildKey(mutationId), store);
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
