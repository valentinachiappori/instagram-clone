import { View, Text, Image, StyleSheet } from 'react-native';

const Header = ({ title, logo, right }) => (
  <View style={styles.container}>
    {logo
      ? <Image source={logo} style={styles.logo} resizeMode="contain" />
      : <Text style={styles.title}>{title}</Text>
    }
    <View style={styles.right}>{right}</View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#262626',
  },
  right: {
    alignItems: 'flex-end',
  },
});

export default Header;