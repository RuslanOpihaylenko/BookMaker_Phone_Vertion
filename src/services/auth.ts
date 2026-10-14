import AsyncStorage from
  "@react-native-async-storage/async-storage";

import {
  getApiUrl,
  getAuthHeaders,
  parseResponse,
} from "./api";

import type {
  AuthTokens,
  User,
} from "../type/user";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export async function saveTokens(
  tokens: AuthTokens,
): Promise<void> {
  await AsyncStorage.multiSet([
    [ACCESS_TOKEN_KEY, tokens.access],
    [REFRESH_TOKEN_KEY, tokens.refresh],
  ]);
}

export async function getAccessToken():
  Promise<string | null> {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function clearTokens(): Promise<void> {
  await AsyncStorage.multiRemove([
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
  ]);
}

export async function refreshTokens():
  Promise<boolean> {
  const refresh = await AsyncStorage.getItem(
    REFRESH_TOKEN_KEY,
  );

  if (!refresh) {
    return false;
  }

  try {
    const response = await fetch(
      getApiUrl("/user/token/refresh"),
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ refresh }),
      },
    );

    if (!response.ok) {
      await clearTokens();
      return false;
    }

    const data = await parseResponse<{
      access: string;
      refresh?: string;
    }>(response);

    await saveTokens({
      access: data.access,
      refresh: data.refresh ?? refresh,
    });

    return true;
  } catch {
    return false;
  }
}

export async function authorizedRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  let token = await getAccessToken();

  if (!token) {
    throw new Error(
      "Необходима авторизация.",
    );
  }

  const makeRequest = (accessToken: string) =>
    fetch(getApiUrl(path), {
      ...options,
      headers: {
        ...getAuthHeaders(accessToken),
        ...options.headers,
      },
    });

  let response = await makeRequest(token);

  if (response.status === 401) {
    const refreshed = await refreshTokens();

    if (!refreshed) {
      await clearTokens();

      throw new Error(
        "Сессия истекла. Войдите снова.",
      );
    }

    token = await getAccessToken();

    if (!token) {
      throw new Error(
        "Не удалось обновить токен авторизации.",
      );
    }

    response = await makeRequest(token);
  }

  return parseResponse<T>(response);
}

export async function fetchCurrentUser():
  Promise<User | null> {
  const token = await getAccessToken();

  if (!token) {
    return null;
  }

  try {
    return await authorizedRequest<User>(
      "/user/me/",
      {
        method: "GET",
      },
    );
  } catch {
    return null;
  }
}

export async function login(
  email: string,
  password: string,
): Promise<void> {
  const response = await fetch(
    getApiUrl("/user/login"),
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  const data = await parseResponse<AuthTokens>(
    response,
  );

  await saveTokens(data);
}

export async function sendAuthCode(
  email: string,
  password: string,
): Promise<void> {
  const response = await fetch(
    getApiUrl("/user/sendAuthCode"),
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  await parseResponse<unknown>(response);
}

export async function register(
  email: string,
  password: string,
): Promise<void> {
  const response = await fetch(
    getApiUrl("/user/createAccount"),
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  await parseResponse<unknown>(response);
}

export async function verifyAccount(
  email: string,
  code: string,
): Promise<void> {
  const response = await fetch(
    getApiUrl("/user/verifyAccount"),
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        email,
        password: code,
      }),
    },
  );

  await parseResponse<unknown>(response);
}

export async function loginWithGoogle(
  googleAccessToken: string,
): Promise<void> {
  const response = await fetch(
    getApiUrl("/user/google/login/"),
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        access_token: googleAccessToken,
      }),
    },
  );

  const data = await parseResponse<AuthTokens>(
    response,
  );

  await saveTokens(data);
}

export async function logout(): Promise<void> {
  await clearTokens();
}

export async function updateProfile(
  userId: number,
  profile: Record<string, unknown>,
): Promise<void> {
  await authorizedRequest<unknown>(
    `/user/${userId}/profile`,
    {
      method: "PATCH",
      body: JSON.stringify(profile),
    },
  );
}