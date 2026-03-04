export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/token",
    LOGOUT: "/api/auth/logout",
    ME: "/api/auth/me",
  },

  PROPERTIES: {
    LIST: "/api/properties",
    DETAIL: (id: string) => `/api/properties/${id}`,
    CREATE: "/api/properties",
    UPDATE: (id: string) => `/api/properties/${id}`,
    DELETE: (id: string) => `/api/properties/${id}`,
    COUNT: "/api/properties/count",
    BY_CITIES: "/api/properties/by-cities",
  },

  AGENTS: {
    REGISTER: "/api/agents/register",
    ME: "/api/agents/me",
    UPDATE: "/api/agents/me",
  },

  PHOTOS: {
    LIST: (propertyId: string) => `/api/photos/property/${propertyId}`,
    UPLOAD: (propertyId: string) => `/api/photos/property/${propertyId}`,
    DELETE: (photoId: string) => `/api/photos/${photoId}`,
  },

  FAVORITE: {
    POST: (id: string) => `/api/favorites/${id}`,
    DELETE: (id: string) => `/api/favorites/${id}`,
    LIST: "/api/favorites/",
  },
} as const;
