import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import { getPost, addComment, deletePost } from '../../../services/postService';
import PostCard from '../../../components/PostCard';
import CommentsModal from '../../../components/commentsModal';
import DeleteModal from '../../../components/deleteModal';
import { styles } from './postDetail.styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { user, token } = useAuth();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const isOwner = user && post?.user?.id === user?.id;

  const fetchPostDetails = async () => {
    try {
      setError('');
      const data = await getPost(id, token);
      setPost(data);
    } catch (err) {
      setError('No se pudo cargar el post.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    try {
      await addComment(id, newComment, token);
      setNewComment('');
      await fetchPostDetails();
    } catch (err) {
      Alert.alert('Error', 'No se pudo publicar el comentario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async () => {
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await deletePost(id, token);
      router.replace('/auth/tabs/home');
    } catch (err) {
      Alert.alert('Error', 'Hubo un error al eliminar');
    } finally {
      setDeleteModalVisible(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0095F6" />
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={{ color: 'red' }}>{error || 'Post no encontrado'}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <PostCard 
        post={post} 
        currentUser={user} 
        token={token} 
        isOwner={isOwner}
        onEdit={() => router.push(`/auth/post/edit/${id}`)}
        onDelete={handleDeletePost}
        onAvatarPress={() => router.push(`/auth/profile/${post.user.id}`)}
        onCommentPress={() => setModalVisible(true)}
      />

      <CommentsModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        comments={post.comments}
        newComment={newComment}
        onCommentChange={setNewComment}
        onAddComment={handleAddComment}
        isSubmitting={isSubmitting}
      />

      <DeleteModal
        isVisible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={confirmDelete}
      />
    </SafeAreaView>
  );
}