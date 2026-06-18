import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    gap: 16,
  },
  info: {
    flex: 1,
    gap: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    minWidth: 80,
  },
});
