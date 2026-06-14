import { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { getUser, followUser } from '../services/userService';
import Avatar from './Avatar';
import Button from './Button';
import PostGridItem from './PostGridItem';
import ErrorMessage from './ErrorMessage';
import { styles } from './userProfile.styles';

const UserProfile = ({ userId, isOwner, token, currentUser, onPress, onSignOut }) => {
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followError, setFollowError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      setLoading(true);
      setError(null);

      getUser(userId, token)
        .then((data) => {
          if (cancelled) return;
          setProfileUser(data);
          setIsFollowing(
            (data.followers || []).some((f) => f.id === currentUser?.id)
          );
          setLoading(false);
        })
        .catch((err) => {
          if (cancelled) return;
          setError(err.message);
          setLoading(false);
        });

      return () => { cancelled = true; };
    }, [userId])
  );

  const handleFollow = async () => {
    try {
      await followUser(profileUser.id, token);
      setIsFollowing(!isFollowing);
    } catch (err) {
      setFollowError(err.message);
    }
  };

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#0095F6" />
    </View>
  );

  if (error || !profileUser) return (
    <View style={styles.center}>
      <ErrorMessage message={error || 'No se encontró el usuario.'} />
    </View>
  );

  const posts = [...(profileUser.posts || [])].reverse();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Avatar uri={profileUser.image} name={profileUser.name} size={80} />
        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{profileUser.name}</Text>
            {isOwner && onSignOut && (
              <Button onPress={onSignOut} style={styles.signOutButton}>Salir</Button>
            )}
          </View>
          <View style={styles.stats}>
            <Text style={styles.stat}>{profileUser.posts?.length || 0} publicaciones</Text>
            <Text style={styles.stat}>{profileUser.followers?.length || 0} seguidos</Text>
          </View>
          {!isOwner && (
            <>
              <Button onPress={handleFollow}>
                {isFollowing ? 'Dejar de seguir' : 'Seguir'}
              </Button>
              <ErrorMessage message={followError} />
            </>
          )}
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PostGridItem
            post={item}
            onPress={() => onPress?.(item.id)}
          />
        )}
      />
    </View>
  );
};

export default UserProfile;
