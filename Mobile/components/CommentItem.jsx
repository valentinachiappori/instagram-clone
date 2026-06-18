import { View, Text } from 'react-native';
import Avatar from './Avatar';
import { styles } from './commentItem.styles';

const CommentItem = ({ comment }) => (
  <View style={styles.container}>
    <Avatar uri={comment.user?.image} name={comment.user?.name} size={28} style={styles.avatar} />
    <Text style={styles.text}>
      <Text style={styles.name}>{comment.user?.name} </Text>
      {comment.body}
    </Text>
  </View>
);

export default CommentItem;
