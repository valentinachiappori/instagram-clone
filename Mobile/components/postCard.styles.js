import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#262626',
  },
  image: {
    width: '100%',
    height: 400,
    backgroundColor: '#FAFAFA',
  },
  footer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  actionButton: {
    marginRight: 14,
  },
  likesText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#262626',
    marginBottom: 4,
  },
  descriptionRow: {
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
    color: '#262626',
  },
  text: {
    fontSize: 14,
    color: '#262626',
    lineHeight: 20,
  },
});
