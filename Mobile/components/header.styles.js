import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#262626',
  },
  right: {
    alignItems: 'flex-end',
  },
});
