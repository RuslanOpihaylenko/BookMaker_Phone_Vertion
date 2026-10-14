import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

export default function Hero() {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../photos/image.png')} ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: '#F6F1FF',
  },
  img:{
    height: "100%",
    width: "100%"
  }
});