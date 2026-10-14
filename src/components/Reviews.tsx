import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { getLatestReviews } from "../services/reviews";

import type {
  MainPageReviewDTO,
} from "../type/review";

export default function Reviews() {
  const [reviews, setReviews] = useState<
    MainPageReviewDTO[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let isActive = true;

    async function loadReviews() {
      try {
        setLoading(true);
        setError(null);

        const response = await getLatestReviews();

        console.log("Reviews API response:", response);

        if (!isActive) {
          return;
        }

        setReviews(response.results);
      } catch (error) {
        console.error(
          "Failed to load reviews:",
          error,
        );

        if (isActive) {
          setError(
            error instanceof Error
              ? error.message
              : "Не удалось загрузить отзывы",
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    void loadReviews();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        What our guests say
      </Text>

      {loading ? (
        <Text>Loading reviews...</Text>
      ) : error ? (
        <Text>
          Error loading reviews: {error}
        </Text>
      ) : reviews.length === 0 ? (
        <Text>No reviews yet.</Text>
      ) : (
        reviews.map((review) => (
          <View
            key={review.id}
            style={styles.card}
          >
            <Text style={styles.stars}>
              {"★".repeat(
                Math.max(
                  0,
                  Math.min(5, review.rating),
                ),
              )}
            </Text>

            <Text style={styles.review}>
              {review.review}
            </Text>

            <Text style={styles.author}>
              {review.user?.name || "Guest"}
            </Text>

            <Text style={styles.hotel}>
              {review.hotel?.name || "Hotel"}
            </Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 20,
  },

  title: {
    marginBottom: 18,
    fontSize: 23,
    fontWeight: "800",
    color: "#222222",
  },

  card: {
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#F8F5FF",
  },

  stars: {
    fontSize: 18,
    color: "#F5A623",
  },

  review: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 23,
    color: "#444444",
  },

  author: {
    marginTop: 12,
    fontWeight: "700",
    color: "#581ADB",
  },

  hotel: {
    marginTop: 6,
    fontSize: 13,
    color: "#777777",
  },
});

