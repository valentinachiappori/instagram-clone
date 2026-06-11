import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import ErrorMessage from '../components/ErrorMessage';
import { getTimeline } from '../api/userService';
import '../styles/Home.css';

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getTimeline();
        setPosts(data.timeline || []);
      } catch (error) {
        if (error.response?.status === 401) { navigate('/login'); return; }
        setError(error.response?.data?.error || error.response?.data?.errors?.[0] || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [navigate]);

  if (loading) return <div className="home-loading">Cargando timeline...</div>;

  return (
    <div className="home-container">
      {error && <ErrorMessage message={error} />}
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.id} post={post} currentUser={user} />
        ))
      ) : (
        <p className="home-empty">No hay publicaciones para mostrar.</p>
      )}
    </div>
  );
};

export default Home;