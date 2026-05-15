import { useEffect, useState } from 'react'
import { search } from '../api/searchService';
import { useSearchParams } from 'react-router-dom';
import '../styles/Search.css';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';


const Search = () => {

  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;
    setSearched(false);
    setLoading(true);
    search(query)
        .then(data => { 
            setUsers(data.users); 
            setPosts(data.posts);
            setSearched(true);
        })
        .finally(() => setLoading(false))
        
}, [searchParams])
  
  return (
    <div>       
      <h1>{searchParams.get("query")}</h1>
        {loading && <p>Buscando...</p>}
        {searched && users.length === 0 && posts.length === 0 ? (
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