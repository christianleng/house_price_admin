export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/token",
    LOGOUT: "/api/auth/logout",
    ME: "/api/auth/me",
  },

  ADMIN: {
    STATS: "/api/admin/stats",
    STATS_MONTHLY: "/api/admin/stats/monthly",
    STATS_CITIES: "/api/admin/stats/cities",
    PROPERTIES: "/api/admin/properties",
    PROPERTY_DETAIL: (id: string) => `/api/admin/properties/${id}`,
    PROPERTY_UPDATE: (id: string) => `/api/admin/properties/${id}`,
    PROPERTY_DELETE: (id: string) => `/api/admin/properties/${id}`,
  },

  PROPERTIES: {
    LIST: "/api/properties",
    COUNT: "/api/properties/count",
  },
} as const;
