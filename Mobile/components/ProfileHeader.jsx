import { View, Text, StyleSheet } from 'react-native';
import Avatar from './Avatar';

const ProfileHeader = ({ user, actionButton }) => (
  <View style={styles.container}>
    <Avatar uri={user.image} name={user.name} size={80} />
    <View style={styles.info}>
      <View style={styles.nameRow}>
        <Text style={styles.name}>{user.name}</Text>
        {actionButton}
      </View>
      <View style={styles.stats}>
        <Text style={styles.stat}>{user.posts?.length || 0} publicaciones</Text>
        <Text style={styles.stat}>{user.followers?.length || 0} seguidos</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    gap: 16,
  },
  info: {
    flex: 1,
    gap: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#262626',
  },
  stats: {
    flexDirection: 'column',
    gap: 4,
  },
  stat: {
    fontSize: 14,
    color: '#262626',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    minWidth: 80,
  },
});

export default ProfileHeader;