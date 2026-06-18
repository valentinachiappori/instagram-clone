import { Text } from 'react-native';
import { styles } from './errorMessage.styles';

const ErrorMessage = ({ message, reserveSpace = false }) => {
  if (!reserveSpace && !message) return null;

  return (
    <Text style={[styles.error, !message && styles.hidden]}>
      {message}
    </Text>
  );
};

export default ErrorMessage;
