import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import { getTimelineService } from '../../../services/userService';
import PostCard from '../../../components/PostCard';
import Header from '../../../components/Header';
import ErrorMessage from '../../../components/ErrorMessage';
import { styles } from './home.styles';

export default function Home() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchTimeline = async () => {
    setError(null);
    try {
      const data = await getTimelineService(token);
      setPosts(data.timeline || []);
    } catch (err) {
      setError(err.message || 'Error al cargar el timeline.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTimeline();
  };

  const renderPost = ({ item }) => (
    <PostCard
      post={item}
      currentUser={user}
      token={token}
      onPress={() => router.push(`/auth/post/${item.id}`)}
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
    </SafeAreaView>
  );
}
