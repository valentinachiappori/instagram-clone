import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  avatar: {
    marginRight: 8,
    marginTop: 2,
  },
  name: {
    fontWeight: 'bold',
    color: '#262626',
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: '#262626',
    lineHeight: 20,
  },
});
