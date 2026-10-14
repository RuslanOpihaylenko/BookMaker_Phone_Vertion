import type {
  MainPageReviewsResponse,
  HotelReviewsResponse,
} from "../type/review";

import { apiRequest } from "./api";

export async function getLatestReviews():
  Promise<MainPageReviewsResponse> {
  return apiRequest<MainPageReviewsResponse>(
    "/reviews/",
    {
      method: "GET",
    },
  );
}

export async function getHotelReviews(
  hotelId: number,
): Promise<HotelReviewsResponse> {
  return apiRequest<HotelReviewsResponse>(
    `/hotels/${hotelId}/reviews/`,
    {
      method: "GET",
    },
  );
}