import { TextInput, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
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
});

export default Input;