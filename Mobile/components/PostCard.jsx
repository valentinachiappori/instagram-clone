import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from './Avatar';
import ErrorMessage from './ErrorMessage';
import { updateLike } from '../services/postService';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const pad = (n) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} - ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const PostCard = ({ post, currentUser, token, onPress, onAvatarPress, onCommentPress, isOwner, onEdit, onDelete }) => {
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
        <TouchableOpacity style={styles.userInfo} onPress={onAvatarPress} activeOpacity={0.8}>
          <Avatar uri={post.user?.image} name={post.user?.name} size={32} style={styles.avatar} />
          <View>
            <Text style={styles.username}>{post.user?.name}</Text>
            <Text style={styles.date}>{formatDate(post.date)}</Text>
          </View>
        </TouchableOpacity>

        {isOwner && (
          <View style={styles.ownerActions}>
            <TouchableOpacity onPress={onDelete} style={styles.actionIcon}>
              <Ionicons name="trash-outline" size={22} color="#262626" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onEdit} style={styles.actionIcon}>
              <Ionicons name="pencil-outline" size={22} color="#262626" />
            </TouchableOpacity>
          </View>
        )}
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
            <Text style={styles.actionCount}>{likesCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCommentPress || onPress} style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#262626" />
            <Text style={styles.actionCount}>{post.comments?.length || 0}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.descriptionRow}>
          <Text style={styles.text}>
            <Text style={styles.bold}>{post.user?.name} </Text>
            {post.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#262626',
  },
  date: {
    fontSize: 12,
    color: '#8E8E8E',
    marginTop: 2,
  },
  ownerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginLeft: 15,
  },
  image: {
    width: '100%',
    aspectRatio: 0.7,
    backgroundColor: '#FAFAFA',
  },
  footer: {
    padding: 10,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  actionCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#262626',
  },
  descriptionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 14,
    color: '#262626',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default PostCard;