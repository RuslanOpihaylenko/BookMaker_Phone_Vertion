import type { CityDTO } from "../type/city";
import type { CountryDTO } from "../type/country";

import { apiRequest } from "./api";

export async function getCountries():
  Promise<CountryDTO[]> {
  return apiRequest<CountryDTO[]>(
    "/countries/",
    {
      method: "GET",
    },
  );
}

export async function getCities():
  Promise<CityDTO[]> {
  return apiRequest<CityDTO[]>(
    "/cities/",
    {
      method: "GET",
    },
  );
}