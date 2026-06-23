import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Avatar from './Avatar';

const CommentItem = ({ comment, onUserPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => onUserPress?.(comment.user?.id)}>
      <Avatar uri={comment.user?.image} name={comment.user?.name} size={28} style={styles.avatar} />
    </TouchableOpacity>
    <Text style={styles.text}>
      <Text style={styles.name} onPress={() => onUserPress?.(comment.user?.id)}>{comment.user?.name} </Text>
      {comment.body}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  avatar: {
    marginRight: 8,
    marginTop: 2,
  },
  name: {
    fontWeight: 'bold',
    color: '#262626',
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: '#262626',
    lineHeight: 20,
  },
});

export default CommentItem;