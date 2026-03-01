export interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  first_name: string;
  last_name: string;

  agency_name?: string;
  city?: string;
  created_at: string;
  name?: string;
  phone: string;
  rsac_number?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  access_token: string;
  token_type: string;
}
