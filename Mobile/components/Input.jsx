import { TextInput } from 'react-native';
import { styles } from './input.styles';

const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  onSubmitEditing,
  returnKeyType,
  style,
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor="#8E8E8E"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
    />
  );
};

export default Input;
