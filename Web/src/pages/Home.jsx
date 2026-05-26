import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import PostHeader from '../components/post/PostHeader';
import '../components/Home.css';

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

  if (loading) return <div className="home-loading">Cargando timeline...</div>;

  return (
    <div className="home-container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      ) : (
        <p className="home-empty">No hay publicaciones para mostrar.</p>
      )}
    </div>
  );
};

export default Home;
