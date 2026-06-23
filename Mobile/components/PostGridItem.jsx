import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const PostGridItem = ({ post, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
    <Image source={{ uri: post.image }} style={styles.image} resizeMode="cover" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 4 / 5,
    margin: 0.5,
    backgroundColor: '#EFEFEF',
  },
  image: {
    flex: 1,
  },
});

export default PostGridItem;