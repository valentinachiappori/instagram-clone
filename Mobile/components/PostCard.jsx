import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from './Avatar';
import CommentItem from './CommentItem';
import ErrorMessage from './ErrorMessage';
import { updateLike } from '../services/postService';
import { styles } from './postCard.styles';

const PostCard = ({ post, currentUser, token, onPress }) => {
  const [isLiked, setIsLiked] = useState(
    () => currentUser && post.likes?.some((u) => u.id === currentUser.id)
  );
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [likeError, setLikeError] = useState(null);

  const handleLike = async () => {
    const prevLiked = isLiked;
    const prevCount = likesCount;
    setIsLiked(!prevLiked);
    setLikesCount(prevLiked ? prevCount - 1 : prevCount + 1);
    setLikeError(null);
    try {
      await updateLike(post.id, token);
    } catch (err) {
      setIsLiked(prevLiked);
      setLikesCount(prevCount);
      setLikeError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar uri={post.user?.image} name={post.user?.name} size={32} style={styles.avatar} />
        <Text style={styles.username}>{post.user?.name}</Text>
      </View>

      <ErrorMessage message={likeError} />

      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <Image source={{ uri: post.image }} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>

      <View style={styles.footer}>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={26}
              color={isLiked ? '#ED4956' : '#262626'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress} style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#262626" />
          </TouchableOpacity>
        </View>

        <Text style={styles.likesText}>{likesCount} Me gusta</Text>

        <View style={styles.descriptionRow}>
          <Text style={styles.text}>
            <Text style={styles.bold}>{post.user?.name} </Text>
            {post.description}
          </Text>
        </View>

        {post.comments?.slice(0, 2).map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </View>
    </View>
  );
};

export default PostCard;
