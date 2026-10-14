export interface HotelDTO {
  id: number;
  name: string;
  description: string | null;
  address: string;
  latitude: string | null;
  longitude: string | null;
  phone: string;
  email: string;
  stars: number;
  photo: string | null;
  city: number;
  price: number;
}

export interface HotelCardDataDTO {
  hotel: HotelDTO;
  photos: Array<{
    photo: string;
  }>;
  nearest_airport_distance: number | null;
  nearest_train_distance: number | null;
  review_count: number;
  average_rating: number | null;
  cheapest_room_price: string | null;
  cheapest_room_beds: number | null;
  cheapest_room_wifi: boolean | null;
}

export interface PaginatedHotelsResponse {
  count: number;
  results: HotelDTO[];
}

export interface GetHotelsDTO {
  city?: number;
  minPrice?: number;
  rating?: number;
  stars?: number;
}

export interface PaginationDTO {
  el: number;
  page: number;
}

export type HotelCardDataBatchResponse = Record<
  number,
  HotelCardDataDTO
>;

