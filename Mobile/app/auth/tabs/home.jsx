import React, { useState, useCallback, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import { getTimelineService } from '../../../services/userService';
import { addComment } from '../../../services/postService';
import PostCard from '../../../components/PostCard';
import Header from '../../../components/Header';
import ErrorMessage from '../../../components/ErrorMessage';
import CommentsModal from '../../../components/commentsModal';

export default function Home() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasLoadedRef = useRef(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const [activePost, setActivePost] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTimeline = async (showLoader = false) => {
    setError(null);
    if (showLoader) setIsLoading(true);
    try {
      const data = await getTimelineService(token);
      setPosts(data.timeline || []);
      hasLoadedRef.current = true;

      if (activePost) {
        const updatedPost = (data.timeline || []).find(p => p.id === activePost.id);
        if (updatedPost) setActivePost(updatedPost);
      }
    } catch (err) {
      setError(err.message || 'Error al cargar el timeline.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTimeline(!hasLoadedRef.current);
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchTimeline(false);
  };

  const handleOpenComments = (post) => {
    setActivePost(post);
    setModalVisible(true);
  };

  const handleAddCommentFromHome = async () => {
    if (!newComment.trim() || !activePost) return;
    setIsSubmitting(true);
    try {
      await addComment(activePost.id, newComment, token);
      setNewComment('');
      await fetchTimeline();
    } catch (err) {
      setError('No se pudo publicar el comentario.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPost = ({ item }) => (
    <PostCard
      post={item}
      currentUser={user}
      token={token}
      isOwner={user && item.user?.id === user?.id}
      onPress={() => router.push(`/auth/post/${item.id}`)}
      onAvatarPress={() => router.push(`/auth/profile/${item.user?.id}`)}
      onCommentPress={() => handleOpenComments(item)}
    />
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerAll]}>
        <ActivityIndicator size="large" color="#0095F6" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}
    >
      <Header logo={require('../../../assets/splash.png')} />

      <ErrorMessage message={error} />

      <FlatList
        data={posts}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0095F6']} />
        }
        ListEmptyComponent={
          <View style={[styles.centerAll, { marginTop: 50 }]}>
            <Text>No hay posts para mostrar.</Text>
          </View>
        }
      />

      <CommentsModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        comments={activePost?.comments}
        newComment={newComment}
        onCommentChange={setNewComment}
        onAddComment={handleAddCommentFromHome}
        isSubmitting={isSubmitting}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerAll: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});