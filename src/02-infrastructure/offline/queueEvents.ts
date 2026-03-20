const QUEUE_CHANGED_EVENT = "mutation-queue-changed";

/**
 * Émet un événement indiquant que la mutation queue a changé.
 * Utilisé par mutationQueue.ts après chaque enqueue/dequeue.
 */
export function emitQueueChanged(): void {
  window.dispatchEvent(new Event(QUEUE_CHANGED_EVENT));
}

/**
 * S'abonne aux changements de la mutation queue.
 * Retourne une fonction de cleanup (removeEventListener).
 */
export function onQueueChanged(handler: () => void): () => void {
  window.addEventListener(QUEUE_CHANGED_EVENT, handler);
  return () => window.removeEventListener(QUEUE_CHANGED_EVENT, handler);
}
