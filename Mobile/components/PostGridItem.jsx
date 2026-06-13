import { TouchableOpacity, Image, Dimensions } from 'react-native';
import { styles } from './postGridItem.styles';

const ITEM_SIZE = Dimensions.get('window').width / 3;

const PostGridItem = ({ post, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <Image
      source={{ uri: post.image }}
      style={[styles.image, { width: ITEM_SIZE, height: ITEM_SIZE }]}
      resizeMode="cover"
    />
  </TouchableOpacity>
);

export default PostGridItem;
