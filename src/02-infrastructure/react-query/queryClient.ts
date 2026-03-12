import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      // En cache 24h — disponibles offline entre les navigations
      gcTime: 60 * 60 * 24 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      // Ne met pas la query en erreur si offline —
      // utilise le cache existant et attend le retour en ligne
      networkMode: "offlineFirst",
    },
    mutations: {
      networkMode: "always",
    },
  },
});
