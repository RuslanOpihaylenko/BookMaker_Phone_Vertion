export type CityDTO = {
  id: number;
  name: string;
  center: string | null;
  center_latitude: string | null;
  center_longitude: string | null;
  country: number;
};

export type CreateCityDTO = Omit<
  CityDTO,
  "id" | "center_latitude" | "center_longitude"
>;