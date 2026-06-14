import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#262626',
    marginBottom: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  loader: {
    marginTop: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: '#8E8E8E',
    marginTop: 32,
    fontSize: 14,
  },
  usersSection: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
  },
  usersContent: {
    paddingHorizontal: 12,
    gap: 16,
  },
  userItem: {
    alignItems: 'center',
    width: 64,
  },
  userName: {
    fontSize: 12,
    color: '#262626',
    marginTop: 4,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
