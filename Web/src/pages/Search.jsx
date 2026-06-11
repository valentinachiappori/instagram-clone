import { useEffect, useState } from 'react'
import { search } from '../api/searchService';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import '../styles/Search.css';
import ErrorMessage from '../components/ErrorMessage';


const Search = () => {

  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;
    let cancelled = false;

    (async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await search(query);
            if (cancelled) return;
            setUsers(data.users);
            setPosts(data.posts);
            setSearched(true);
        } catch (err) {
            if (cancelled) return;
            setUsers([]);
            setPosts([]);
            if (err.response?.status === 401) { navigate('/login'); return; }
            setError(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
        } finally {
            if (!cancelled) setLoading(false);
        }
    })();

    return () => { cancelled = true; };
  }, [searchParams, navigate])
  
  return (
    <div>       
      <h1>{searchParams.get("query")}</h1>
        {loading && <p>Buscando...</p>}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && searched && users.length === 0 && posts.length === 0 ? (
          <ErrorMessage message="No se encontraron resultados" />
        ) : (
          <>
            {users.length > 0 && (
              <div className="search-users">
                {users.map(user => (
                  <Link to={`/profile/${user.id}`} key={user.id} className="user-avatar">
                    <img src={user.image} alt={user.name} />
                  </Link>
                ))}
              </div>
            )}
            {posts.length > 0 && (
              <div className="search-posts">
                {posts.map(post => (
                  <Link to={`/post/${post.id}`} key={post.id}>
                    <img src={post.image} alt={post.description} />
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
    </div>
  )
}

export default Search