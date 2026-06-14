import React from 'react';
import { View, Image } from 'react-native';
import { styles } from './splashScreen.styles';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash.png')} style={styles.logo} resizeMode="contain" />
    </View>
  );
};
