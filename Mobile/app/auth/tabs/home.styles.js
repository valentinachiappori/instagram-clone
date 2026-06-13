import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
  },
  logoImage: {
    width: 120,
    height: 40,
  },
  logoutText: {
    color: '#ED4956',
    fontWeight: 'bold',
    fontSize: 14,
  },
  postContainer: {
    marginBottom: 15,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFEFEF',
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#262626',
  },
  postImage: {
    width: '100%',
    height: 400,
    backgroundColor: '#FAFAFA',
  },
  postFooter: {
    padding: 12,
  },
  actionIcons: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  iconPlaceholder: {
    fontSize: 22,
    marginRight: 15,
    color: '#262626',
  },
  likesText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
    color: '#262626',
  },
  descriptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  descriptionText: {
    fontSize: 14,
    color: '#262626',
  },
  dateText: {
    fontSize: 12,
    color: '#8E8E8E',
    marginTop: 4,
  },
  centerAll: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
