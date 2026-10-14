export type User = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  birthday: string | null;
  photo: string | null;
  ampthill: string;
  city: number | null;
  country: number | null;
  currency: number | null;
  payMethod: number | null;
};

export type AuthTokens = {
  access: string;
  refresh: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
};
export type UserProfileUpdateDTO = {
  name?: string;
  email?: string;
  phone?: string | null;
  birthday?: string | null;
  ampthill?: string;
  city?: number | null;
  country?: number | null;
  currency?: number | null;
};

export type ProfileStatusDTO = {
  has_info: boolean;
};