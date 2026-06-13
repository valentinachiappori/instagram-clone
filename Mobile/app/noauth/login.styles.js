import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 200,
    height: 70,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#DBDBDB',
    paddingTop: 20,
  },
  footerText: {
    color: '#8E8E8E',
    fontSize: 14,
  },
  link: {
    color: '#0095F6',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
});
