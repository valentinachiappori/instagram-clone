import { useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../../components/Input';
import { useRouter } from 'expo-router';
import { search } from '../../../services/searchService';
import Avatar from '../../../components/Avatar';
import PostGridItem from '../../../components/PostGridItem';
import ErrorMessage from '../../../components/ErrorMessage';
import { styles } from './search.styles';

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await search(query.trim());
      setUsers(data.users);
      setPosts(data.posts);
      setSearched(true);
    } catch (err) {
      setUsers([]);
      setPosts([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const ListHeader = () => (
    <>
      {loading && <ActivityIndicator style={styles.loader} color="#0095F6" />}
      <ErrorMessage message={error} />
      {!loading && !error && searched && users.length === 0 && posts.length === 0 && (
        <Text style={styles.emptyText}>No se encontraron resultados.</Text>
      )}
      {users.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.usersSection}
          contentContainerStyle={styles.usersContent}
        >
          {users.map((user) => (
            <TouchableOpacity
              key={user.id}
              style={styles.userItem}
              onPress={() => router.push(`/auth/profile/${user.id}`)}
            >
              <Avatar uri={user.image} name={user.name} size={56} />
              <Text style={styles.userName} numberOfLines={1}>{user.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </>
  );

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}
    >
      <View style={styles.searchBar}>
        <View style={styles.searchInputWrapper}>
          <Input
            placeholder="Search"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoCapitalize="none"
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Ionicons name="search" size={18} color="#8E8E8E" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={<ListHeader />}
        renderItem={({ item }) => (
          <PostGridItem
            post={item}
            onPress={() => router.push(`/auth/post/${item.id}`)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
