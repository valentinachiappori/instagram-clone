import { View, Text } from 'react-native';
import Avatar from './Avatar';
import { styles } from './profileHeader.styles';

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

export default ProfileHeader;
