import { Text, StyleSheet } from 'react-native';

const ErrorMessage = ({ message, reserveSpace = false }) => {
  if (!reserveSpace && !message) return null;

  return (
    <Text style={[styles.error, !message && styles.hidden]}>
      {message}
    </Text>
  );
};

const styles = StyleSheet.create({
  error: {
    color: '#ED4956',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
  },
  hidden: {
    opacity: 0,
  },
});

export default ErrorMessage;