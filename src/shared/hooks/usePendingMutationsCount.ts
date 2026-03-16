import { useEffect, useState } from "react";
import { getAll } from "@/02-infrastructure/offline/mutationQueue";
import { onQueueChanged } from "@/02-infrastructure/offline/queueEvents";

export function usePendingMutationsCount(): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function refresh() {
      const pending = await getAll();
      setCount(pending.length);
    }

    refresh();

    return onQueueChanged(refresh);
  }, []);

  return count;
}
