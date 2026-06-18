import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { styles } from './button.styles';

const Button = ({ children, onPress, disabled = false, loading = false, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, (disabled || loading) && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading
        ? <ActivityIndicator color="#FFFFFF" />
        : <Text style={styles.buttonText}>{children}</Text>
      }
    </TouchableOpacity>
  );
};

export default Button;
