import { View, Text, Image } from 'react-native';
import { styles } from './header.styles';

const Header = ({ title, logo, right }) => (
  <View style={styles.container}>
    {logo
      ? <Image source={logo} style={styles.logo} resizeMode="contain" />
      : <Text style={styles.title}>{title}</Text>
    }
    <View style={styles.right}>{right}</View>
  </View>
);

export default Header;
