import { Stack } from 'expo-router';
import { ProtectedRoute } from '../../components/ProtectedRoute';

export default function AppLayout() {
  return (
    <ProtectedRoute>
      <Stack screenOptions={{ headerShown: false }}>
        {/* aca van las pantallas del timeline */}
        <Stack.Screen name="index" />
      </Stack>
    </ProtectedRoute>
  );
}
