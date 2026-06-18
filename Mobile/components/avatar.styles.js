import { StyleSheet } from 'react-native';

export const getStyles = (size) => StyleSheet.create({
  avatar: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: '#EFEFEF',
  },
});
