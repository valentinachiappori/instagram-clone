import { View, Text, StyleSheet } from 'react-native';
import Avatar from './Avatar';

const CommentItem = ({ comment }) => (
  <View style={styles.container}>
    <Avatar uri={comment.user?.image} name={comment.user?.name} size={28} style={styles.avatar} />
    <Text style={styles.text}>
      <Text style={styles.name}>{comment.user?.name} </Text>
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