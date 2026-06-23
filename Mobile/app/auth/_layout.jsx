import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/noauth/login');
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading)
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#0095F6" /></View>;

  return <Stack screenOptions={{ headerShown: false }} />;
}
