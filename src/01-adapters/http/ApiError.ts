export class ApiError extends Error {
  public readonly status: number;
  public readonly detail: string;
  public readonly response?: Response;

  constructor(status: number, detail: string, response?: Response) {
    super(detail);
    this.name = "ApiError";

    this.status = status;
    this.detail = detail;
    this.response = response;
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isForbidden() {
    return this.status === 403;
  }

  get isNotFound() {
    return this.status === 404;
  }

  get isClientError() {
    return this.status >= 400 && this.status < 500;
  }

  get isServerError() {
    return this.status >= 500;
  }

  static async fromResponse(response: Response): Promise<ApiError> {
    let detail = "Une erreur est survenue";

    try {
      const data = await response.json();
      detail = data.detail || data.message || detail;
    } catch {
      detail = response.statusText || detail;
    }

    return new ApiError(response.status, detail, response);
  }
}
