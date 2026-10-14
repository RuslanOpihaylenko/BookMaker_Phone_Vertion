import type {
  User,
  UserProfileUpdateDTO,
  ProfileStatusDTO,
} from "../type/user";

import { authorizedRequest } from "./auth";

export async function getCurrentUser():
  Promise<User> {
  return authorizedRequest<User>(
    "/user/profile/",
    {
      method: "GET",
    },
  );
}

export async function getProfileStatus():
  Promise<ProfileStatusDTO> {
  return authorizedRequest<ProfileStatusDTO>(
    "/user/profile/status/",
    {
      method: "GET",
    },
  );
}

export async function updateUserProfile(
  profile: UserProfileUpdateDTO,
): Promise<User> {
  return authorizedRequest<User>(
    "/user/profile/update/",
    {
      method: "PUT",
      body: JSON.stringify(profile),
    },
  );
}