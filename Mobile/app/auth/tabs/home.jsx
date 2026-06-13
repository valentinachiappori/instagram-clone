import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, RefreshControl, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { getTimelineService } from '../../../services/userService';
import ErrorMessage from '../../../components/ErrorMessage';
import { styles } from './home.styles';

export default function Home() {
  const { token, signOut } = useAuth();
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
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: item.user?.image || `https://ui-avatars.com/api/?name=${item.user?.name || 'U'}` }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{item.user?.name || 'usuario'}</Text>
      </View>

      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/400' }}
        style={styles.postImage}
        resizeMode="cover"
      />

      <View style={styles.postFooter}>
        <View style={styles.actionIcons}>
          <Text style={styles.iconPlaceholder}>♡</Text>
          <Text style={styles.iconPlaceholder}>💬</Text>
        </View>
        <Text style={styles.likesText}>{item.likes?.length || 0} Me gusta</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            <Text style={styles.username}>{item.user?.name || 'usuario'} </Text>
            {item.description}
          </Text>
        </View>
        <Text style={styles.dateText}>HACE UN MOMENTO</Text>
      </View>
    </View>
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
      <View style={styles.header}>
        <Image
          source={require('../../../assets/splash.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={signOut}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

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
