import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function BeOurRegular() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Become one of our regular guests
      </Text>

      <Text style={styles.description}>
        Create an account to make your next booking easier.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 36,
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 18,
    backgroundColor: '#581ADB',
  },

  title: {
    fontSize: 23,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 23,
    color: '#F0E9FF',
  },
});