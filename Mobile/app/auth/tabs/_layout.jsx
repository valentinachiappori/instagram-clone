import { Tabs, Redirect } from 'expo-router';
import { Image, ActivityIndicator, View } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import { styles, tabBarConfig } from './tabs.styles';

const renderIcon = (name) => ({ focused, color }) => {
  if (name === 'home')
    return <Ionicons name={focused ? 'home' : 'home-outline'} size={26} color={color} />;
  if (name === 'search')
    return <Ionicons name={focused ? 'search' : 'search-outline'} size={26} color={color} />;
  if (name === 'create')
    return <Feather name="plus-square" size={26} color={color} />;
};

export default function TabLayout() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading)
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#0095F6" /></View>;

  if (!isAuthenticated)
    return <Redirect href="/noauth/login" />;

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
      <Tabs.Screen name="home"    options={{ tabBarIcon: renderIcon('home') }} />
      <Tabs.Screen name="search"  options={{ tabBarIcon: renderIcon('search') }} />
      <Tabs.Screen name="create"  options={{ tabBarIcon: renderIcon('create') }} />
      <Tabs.Screen name="profile" options={{ tabBarIcon: renderProfileIcon }} />
    </Tabs>
  );
}
