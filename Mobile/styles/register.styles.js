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
    marginBottom: 20,
  },
  logoImage: {
    width: 200,
    height: 70,
    marginBottom: 20,
  },
  subtitle: {
    textAlign: 'center',
    color: '#8E8E8E',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 14,
    color: '#262626',
  },
  button: {
    backgroundColor: '#0095F6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#B2DFFC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorText: {
    color: '#ED4956',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
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
