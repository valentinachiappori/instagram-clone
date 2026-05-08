import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import PostHeader from '../components/post/PostHeader';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const authHeader = token.startsWith('Bearer') ? token : `Bearer ${token}`;

        const response = await axios.get('http://localhost:3000/user', {
          headers: {
            Authorization: authHeader
          }
        });
        
        setPosts(response.data.timeline || []);

      } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
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