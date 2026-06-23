import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import UserProfile from '../../../components/UserProfile';

export default function Profile() {
  const { user, token, signOut } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
    >
      <UserProfile
        userId={user?.id}
        isOwner={true}
        token={token}
        currentUser={user}
        onPress={(postId) => router.push(`/auth/post/${postId}`)}
        onSignOut={signOut}
      />
    </SafeAreaView>
  );
}
