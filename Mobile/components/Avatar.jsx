import { Image } from 'react-native';
import { getStyles } from './avatar.styles';

const Avatar = ({ uri, name, size = 32, style }) => {
  const source = uri
    ? { uri }
    : { uri: `https://ui-avatars.com/api/?name=${name || 'U'}` };

  return <Image source={source} style={[getStyles(size).avatar, style]} />;
};

export default Avatar;
