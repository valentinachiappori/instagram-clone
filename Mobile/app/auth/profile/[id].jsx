import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import UserProfile from '../../../components/UserProfile';

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  const { user, token } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
    >
      <UserProfile
        userId={id}
        isOwner={String(id) === String(user?.id)}
        token={token}
        currentUser={user}
        onPress={(postId) => router.push(`/auth/post/${postId}`)}
      />
    </SafeAreaView>
  );
}
