import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    gap: 16,
  },
  headerInfo: {
    flex: 1,
    gap: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  signOutButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    minWidth: 80,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#262626',
  },
  stats: {
    flexDirection: 'column',
    gap: 4,
  },
  stat: {
    fontSize: 14,
    color: '#262626',
  },
});
