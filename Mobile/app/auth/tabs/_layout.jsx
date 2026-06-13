import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import { styles, tabBarConfig } from '../../../styles/tabs.styles';

const renderIcon = (name) => ({ focused, color }) => {
  if (name === 'home')
    return <Ionicons name={focused ? 'home' : 'home-outline'} size={26} color={color} />;
  if (name === 'search')
    return <Ionicons name={focused ? 'search' : 'search-outline'} size={26} color={color} />;
  if (name === 'create')
    return <Feather name="plus-square" size={26} color={color} />;
};

function TabNavigator() {
  const { user } = useAuth();
  const profileImage = user?.image
    ? { uri: user.image }
    : { uri: `https://ui-avatars.com/api/?name=${user?.name || 'U'}` };

  const renderProfileIcon = ({ focused }) => (
    <Image
      source={profileImage}
      style={[styles.profileIcon, focused && styles.profileIconFocused]}
    />
  );

  return (
    <Tabs screenOptions={{ ...tabBarConfig, tabBarStyle: styles.tabBar, tabBarItemStyle: styles.tabBarItem }}>
      <Tabs.Screen name="index"   options={{ tabBarIcon: renderIcon('home') }} />
      <Tabs.Screen name="search"  options={{ tabBarIcon: renderIcon('search') }} />
      <Tabs.Screen name="create"  options={{ tabBarIcon: renderIcon('create') }} />
      <Tabs.Screen name="profile" options={{ tabBarIcon: renderProfileIcon }} />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <ProtectedRoute>
      <TabNavigator />
    </ProtectedRoute>
  );
}
