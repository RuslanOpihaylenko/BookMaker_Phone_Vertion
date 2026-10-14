import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import type { ReactNode } from "react";

import type { User } from "../type/user";

import * as AuthService from "../services/auth";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  sendAuthCode: (
    email: string,
    password: string
  ) => Promise<void>;

  register: (
    email: string,
    password: string
  ) => Promise<void>;

  verifyAccount: (
    email: string,
    code: string
  ) => Promise<void>;

  loginWithGoogle: (
    googleAccessToken: string
  ) => Promise<void>;

  logout: () => Promise<void>;

  updateUserProfile: (
    profile: Record<string, unknown>
  ) => Promise<void>;

  refreshUser: () => Promise<User | null>;

  previousPath: string | null;

  setPreviousPath: (
    path: string | null
  ) => void;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [previousPath, setPreviousPath] =
    useState<string | null>(null);

  const refreshUser = useCallback(
    async (): Promise<User | null> => {
      try {
        const currentUser =
          await AuthService.fetchCurrentUser();

        setUser(currentUser);

        return currentUser;
      } catch {
        setUser(null);

        return null;
      }
    },
    []
  );

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      try {
        const token =
          await AuthService.getAccessToken();

        if (!token) {
          return;
        }

        const currentUser =
          await AuthService.fetchCurrentUser();

        if (mounted) {
          setUser(currentUser);
        }

        if (!currentUser) {
          await AuthService.clearTokens();
        }
      } catch {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (
    email: string,
    password: string
  ) => {
    await AuthService.login(email, password);

    const currentUser =
      await AuthService.fetchCurrentUser();

    if (!currentUser) {
      await AuthService.clearTokens();

      throw new Error(
        "Вход выполнен, но получить профиль пользователя не удалось."
      );
    }

    setUser(currentUser);
  };

  const sendAuthCode = async (
    email: string,
    password: string
  ) => {
    await AuthService.sendAuthCode(
      email,
      password
    );
  };

  const register = async (
    email: string,
    password: string
  ) => {
    await AuthService.register(
      email,
      password
    );
  };

  const verifyAccount = async (
    email: string,
    code: string
  ) => {
    await AuthService.verifyAccount(
      email,
      code
    );
  };

  const loginWithGoogle = async (
    googleAccessToken: string
  ) => {
    await AuthService.loginWithGoogle(
      googleAccessToken
    );

    const currentUser =
      await AuthService.fetchCurrentUser();

    if (!currentUser) {
      await AuthService.clearTokens();

      throw new Error(
        "Не удалось получить профиль пользователя."
      );
    }

    setUser(currentUser);
  };

  const logout = async () => {
    await AuthService.logout();

    setUser(null);
  };

  const updateUserProfile = async (
    profile: Record<string, unknown>
  ) => {
    if (!user) {
      throw new Error(
        "Пользователь не авторизован."
      );
    }

    await AuthService.updateProfile(
      user.id,
      profile
    );

    await refreshUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,

        login,
        sendAuthCode,
        register,
        verifyAccount,
        loginWithGoogle,
        logout,

        updateUserProfile,
        refreshUser,

        previousPath,
        setPreviousPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}