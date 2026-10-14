import React from 'react';

import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';

export interface HotelCardItem {
  id: number;
  name: string;
  city: string;
  country: string;
  stars: number;
  price: number | null;
  image: string;
}

interface HotelCardProps {
  hotel: HotelCardItem;
  onPress: () => void;
}

export default function HotelCard({
  hotel,
  onPress,
}: HotelCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      {hotel.image ? (
  <Image
  source={{ uri: hotel.image }}
  style={styles.image}
  resizeMode="cover"
/>
) : (
  <View style={[styles.image, styles.imagePlaceholder]}>
    <Text style={styles.placeholderText}>
      No photo available
    </Text>
  </View>
)}

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {hotel.name}
        </Text>

        <Text style={styles.stars}>
          {'★'.repeat(Math.max(0, hotel.stars))}
        </Text>

        {typeof hotel.price === "number" &&
Number.isFinite(hotel.price) ? (
  <Text style={styles.price}>
    ${hotel.price.toFixed(2)}
    <Text style={styles.night}> / night</Text>
  </Text>
) : (
  <Text style={styles.price}>
    Price unavailable
  </Text>
)}

        <View style={styles.button}>
          <Text style={styles.buttonText}>
            View hotel
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  image: {
    width: '100%',
    height: 190,
    backgroundColor: '#EEEEEE',
  },

  info: {
    padding: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222222',
  },

  location: {
    marginTop: 6,
    fontSize: 14,
    color: '#777777',
  },

  stars: {
    marginTop: 8,
    color: '#F5A623',
    fontSize: 16,
  },

  price: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '800',
    color: '#581ADB',
  },

  night: {
    fontSize: 13,
    fontWeight: '400',
    color: '#777777',
  },

  button: {
    marginTop: 14,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#581ADB',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  imagePlaceholder: {
  justifyContent: "center",
  alignItems: "center",
},

placeholderText: {
  color: "#777777",
  fontSize: 14,
},
});