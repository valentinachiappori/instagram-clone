import { useState, useEffect } from 'react';
import api from '../api/axios';
import PostCard from '../components/PostCard';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/user');
        setPosts(response.data.timeline || []);
      } catch (error) {
        setError(error.response?.data?.error || error.response?.data?.errors?.[0] || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Cargando timeline...</div>;

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', paddingTop: '30px' }}>
      {error && <ErrorMessage message={error} />}
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      ) : (
        <p style={{ textAlign: 'center' }}>No hay publicaciones para mostrar.</p>
      )}
    </div>
  );
};

export default Home;