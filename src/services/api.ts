const API_BASE = process.env.EXPO_PUBLIC_API_URL;

if (!API_BASE) {
  console.warn(
    "EXPO_PUBLIC_API_URL is not configured. Check your .env file.",
  );
}

export function getApiUrl(path: string): string {
  const base = API_BASE?.replace(/\/+$/, "");

  if (!base) {
    throw new Error(
      "Не указан адрес API. Проверь файл .env.",
    );
  }

  return `${base}/${path.replace(/^\/+/, "")}`;
}

export function getAuthHeaders(
  accessToken?: string | null,
): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return headers;
}

export function jsonBody(
  data: unknown,
): { body: string } {
  return {
    body: JSON.stringify(data),
  };
}

export function getErrorMessage(
  data: unknown,
  fallback: string,
): string {
  if (typeof data === "string" && data) {
    return data;
  }

  if (
    typeof data !== "object" ||
    data === null
  ) {
    return fallback;
  }

  const record = data as Record<string, unknown>;

  if (typeof record.error === "string") {
    return record.error;
  }

  if (typeof record.detail === "string") {
    return record.detail;
  }

  if (typeof record.message === "string") {
    return record.message;
  }

  const firstError = Object.values(record).find(
    (value) =>
      typeof value === "string" ||
      (
        Array.isArray(value) &&
        typeof value[0] === "string"
      ),
  );

  if (typeof firstError === "string") {
    return firstError;
  }

  if (
    Array.isArray(firstError) &&
    typeof firstError[0] === "string"
  ) {
    return firstError[0];
  }

  return fallback;
}

export async function parseResponse<T>(
  response: Response,
): Promise<T> {
  const data: unknown = await response
    .json()
    .catch(() => null);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(
        data,
        `Ошибка запроса: ${response.status}`,
      ),
    );
  }

  return data as T;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(
    getApiUrl(path),
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    },
  );

  return parseResponse<T>(response);
}