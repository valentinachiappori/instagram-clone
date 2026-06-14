import { TouchableOpacity, Image } from 'react-native';
import { styles } from './postGridItem.styles';

const PostGridItem = ({ post, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
    <Image source={{ uri: post.image }} style={styles.image} resizeMode="cover" />
  </TouchableOpacity>
);

export default PostGridItem;
