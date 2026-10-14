import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BookMaker</Text>

      <Text style={styles.description}>
        Find a place that feels like home.
      </Text>

      <Text style={styles.copyright}>
        © {new Date().getFullYear()} Stayly
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 44,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },

  logo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#581ADB',
  },

  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
  },

  copyright: {
    marginTop: 20,
    fontSize: 12,
    color: '#999999',
  },
});