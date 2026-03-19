import { env } from "@/app/config/env";
import { ApiError } from "./ApiError";

interface RequestConfig<P extends object = object> extends RequestInit {
  params?: P;
}

class APIClient {
  private readonly baseURL: string;
  private readonly getToken: () => string | undefined;
  private readonly clearToken: () => void;

  constructor(
    baseURL: string,
    getToken: () => string | undefined,
    clearToken: () => void,
  ) {
    this.baseURL = baseURL;
    this.getToken = getToken;
    this.clearToken = clearToken;
  }

  private buildURL<P extends object>(endpoint: string, params?: P): string {
    const url = new URL(endpoint, this.baseURL || window.location.origin);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
          value.forEach((item) => url.searchParams.append(key, String(item)));
        } else {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  private async request<T, P extends object = object>(
    endpoint: string,
    { params, signal, ...options }: RequestConfig<P> = {},
  ): Promise<T> {
    const url = this.buildURL(endpoint, params);
    const token = this.getToken();
    const headers = new Headers(options.headers);

    if (!headers.has("Content-Type"))
      headers.set("Content-Type", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);

    const config: RequestInit = {
      ...options,
      headers,
      signal,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      if (response.status === 401) {
        this.clearToken();
      }

      throw await ApiError.fromResponse(response);
    }

    if (response.status === 204) return undefined as T;

    return response.json();
  }

  async get<T, P extends object = object>(
    endpoint: string,
    config?: RequestConfig<P>,
  ): Promise<T> {
    return this.request<T, P>(endpoint, { ...config, method: "GET" });
  }

  async post<T, P extends object = object, D = unknown>(
    endpoint: string,
    data?: D,
    config?: RequestConfig<P>,
  ): Promise<T> {
    return this.request<T, P>(endpoint, {
      ...config,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T, P extends object = object, D = unknown>(
    endpoint: string,
    data?: D,
    config?: RequestConfig<P>,
  ): Promise<T> {
    return this.request<T, P>(endpoint, {
      ...config,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T, P extends object = object, D = unknown>(
    endpoint: string,
    data?: D,
    config?: RequestConfig<P>,
  ): Promise<T> {
    return this.request<T, P>(endpoint, {
      ...config,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T, P extends object = object>(
    endpoint: string,
    config?: RequestConfig<P>,
  ): Promise<T> {
    return this.request<T, P>(endpoint, { ...config, method: "DELETE" });
  }

  async postForm<T>(
    endpoint: string,
    data: Record<string, string>,
  ): Promise<T> {
    const formData = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const url = this.buildURL(endpoint);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!response.ok) throw await ApiError.fromResponse(response);

    return response.json();
  }
}

import { tokenStorage } from "@/01-adapters/storage/TokenStorageAdapter";

export const apiClient = new APIClient(
  env.API_URL,
  () => tokenStorage.getToken(),
  () => {
    tokenStorage.clearToken();
    window.dispatchEvent(new CustomEvent("auth:unauthorized"));
  },
);
