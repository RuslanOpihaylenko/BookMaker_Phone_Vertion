import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const advantages = [
  {
    title: 'Easy booking',
    description: 'Book your stay in just a few steps.',
  },
  {
    title: 'Secure experience',
    description: 'Your account and booking details matter.',
  },
  {
    title: 'Great choices',
    description: 'Discover hotels for different journeys.',
  },
];

export default function SafeWithUs() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Your journey, made easier
      </Text>

      {advantages.map((item) => (
        <View key={item.title} style={styles.item}>
          <Text style={styles.itemTitle}>
            {item.title}
          </Text>

          <Text style={styles.description}>
            {item.description}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 20,
  },

  title: {
    marginBottom: 20,
    fontSize: 23,
    fontWeight: '800',
    color: '#222222',
  },

  item: {
    marginBottom: 12,
    padding: 18,
    borderRadius: 14,
    backgroundColor: '#F8F5FF',
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#581ADB',
  },

  description: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 21,
    color: '#666666',
  },
});