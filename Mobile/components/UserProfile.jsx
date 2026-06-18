import { useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { getUser, followUser } from '../services/userService';
import ProfileHeader from './ProfileHeader';
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

  const actionButton = isOwner
    ? <Button onPress={onSignOut} style={styles.actionButton}>Salir</Button>
    : <Button onPress={handleFollow} style={styles.actionButton}>
        {isFollowing ? 'Dejar de seguir' : 'Seguir'}
      </Button>;

  return (
    <View style={{ flex: 1 }}>
      <ProfileHeader user={profileUser} actionButton={actionButton} />
      <ErrorMessage message={followError} />

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
