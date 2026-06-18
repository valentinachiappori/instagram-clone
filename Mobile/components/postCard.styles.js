import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#262626',
  },
  date: {
    fontSize: 12,
    color: '#8E8E8E',
    marginTop: 2,
  },
  ownerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginLeft: 15,
  },
  image: {
    width: '100%',
    aspectRatio: 0.7,
    backgroundColor: '#FAFAFA',
  },
  footer: {
    padding: 10,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  actionButton: {
    marginRight: 15,
  },
  likesText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentsText: {
    color: '#8E8E8E',
    marginBottom: 5,
  },
  descriptionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 14,
    color: '#262626',
  },
  bold: {
    fontWeight: 'bold',
  },
});