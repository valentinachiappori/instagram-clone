import { StyleSheet } from 'react-native';

export const tabBarConfig = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: '#262626',
  tabBarInactiveTintColor: '#262626',
};

export const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopColor: '#DBDBDB',
    borderTopWidth: 1,
    height: 84,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  profileIconFocused: {
    borderWidth: 2,
    borderColor: '#000',
  },
});
