import type {
  GetHotelsDTO,
  HotelDTO,
  HotelCardDataDTO,
  HotelCardDataBatchResponse,
  PaginatedHotelsResponse,
  PaginationDTO,
} from "../type/hotel";

import {
  apiRequest,
  jsonBody,
} from "./api";

function paginationQuery(
  pagination: PaginationDTO,
): string {
  const params = new URLSearchParams({
    el: String(pagination.el),
    page: String(pagination.page),
  });

  return `?${params.toString()}`;
}

export async function getHotels(
  filters: GetHotelsDTO = {},
  pagination: PaginationDTO = {
    el: 10,
    page: 1,
  },
): Promise<PaginatedHotelsResponse> {
  return apiRequest<PaginatedHotelsResponse>(
    `/hotels/get/${paginationQuery(pagination)}`,
    {
      method: "PUT",
      ...jsonBody(filters),
    },
  );
}

export async function getHotel(
  hotelId: number,
): Promise<HotelDTO> {
  return apiRequest<HotelDTO>(
    `/hotels/${hotelId}/`,
    {
      method: "GET",
    },
  );
}

export async function getHotelCardData(
  hotelId: number,
): Promise<HotelCardDataDTO> {
  return apiRequest<HotelCardDataDTO>(
    `/hotels/${hotelId}/card-data/`,
    {
      method: "PUT",
    },
  );
}


export async function getHotelCardDataBatch(
  hotelIds: number[],
): Promise<HotelCardDataBatchResponse> {
  return apiRequest<HotelCardDataBatchResponse>(
    "/hotels/card-data-batch/",
    {
      method: "POST",
      ...jsonBody({
        hotel_ids: hotelIds,
      }),
    },
  );
}

