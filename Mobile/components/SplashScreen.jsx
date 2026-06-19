import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash.png')} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 80,
  },
  fromText: {
    color: '#8E8E8E',
    fontSize: 14,
    marginBottom: 5,
  }
});