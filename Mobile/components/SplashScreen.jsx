import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './splashScreen.styles';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Instagram</Text>
    </View>
  );
};
