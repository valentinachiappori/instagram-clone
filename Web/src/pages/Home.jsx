import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import ErrorMessage from '../components/ErrorMessage';
import { getTimeline } from '../api/userService';
import '../styles/Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getTimeline();
        setPosts(data.timeline || []);
      } catch (error) {
        setError(error.response?.data?.error || error.response?.data?.errors?.[0] || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="home-loading">Cargando timeline...</div>;

  return (
    <div className="home-container">
      {error && <ErrorMessage message={error} />}
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
