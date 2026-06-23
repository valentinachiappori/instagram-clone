import { Image, StyleSheet } from 'react-native';

const Avatar = ({ uri, name, size = 32, style }) => {
  const source = uri
    ? { uri }
    : { uri: `https://ui-avatars.com/api/?name=${name || 'U'}` };

  return <Image source={source} style={[getStyles(size).avatar, style]} />;
};

const getStyles = (size) => StyleSheet.create({
  avatar: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: '#EFEFEF',
  },
});

export default Avatar;