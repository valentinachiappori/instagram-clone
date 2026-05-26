import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { useToast } from '../components/ToastProvider';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const authHeader = token ? (token.startsWith('Bearer') ? token : `Bearer ${token}`) : '';

        const response = await axios.get('http://localhost:3000/user', {
          headers: {
            Authorization: authHeader
          }
        });
        
        setPosts(response.data.timeline || []);

      } catch (error) {
        showToast(error.response?.data?.error || error.response?.data?.errors?.[0] || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Cargando timeline...</div>;

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', paddingTop: '30px' }}>
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