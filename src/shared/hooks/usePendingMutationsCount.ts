import { useEffect, useState } from "react";
import { getAll } from "@/02-infrastructure/offline/mutationQueue";

export function usePendingMutationsCount(): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function refresh() {
      const pending = await getAll();
      setCount(pending.length);
    }

    refresh();

    window.addEventListener("mutation-queue-changed", refresh);

    return () => {
      window.removeEventListener("mutation-queue-changed", refresh);
    };
  }, []);

  return count;
}
