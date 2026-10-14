export interface ReviewDTO {
  id: number;
  review: string;
  createdAt: string;
  user: number;
  hotel: number;
  rating: number;
}

export interface MainPageReviewDTO {
  id: number;
  review: string;
  createdAt: string;
  rating: number;
  user: {
    id: number;
    name: string;
    photo: string | null;
  };
  hotel: {
    id: number;
    name: string;
  };
}

export interface MainPageReviewsResponse {
  results: MainPageReviewDTO[];
}

export interface HotelReviewsResponse {
  count: number;
  results: ReviewDTO[];
}