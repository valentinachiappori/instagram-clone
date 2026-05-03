import { useEffect, useState } from 'react'
import { search } from '../api/searchService';
import { useSearchParams } from 'react-router-dom';
import '../styles/Search.css';
import { Link } from 'react-router-dom';


const Search = () => {

  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;
    search(query)
        .then(data => { 
            setUsers(data.users); 
            setPosts(data.posts); 
        })
        
}, [searchParams])
  
  return (
    <div>       
      <h1>{searchParams.get("query")}</h1>
        <div className="search-users">
          {users.map(user => (
            <Link to={`/profile/${user.id}`} key={user.id} className="user-avatar">
              <img src={user.image} alt={user.name} />
            </Link>
          ))}
        </div>
        <div className="search-posts">
          {posts.map(post => (
            <img key={post.id} src={post.image} alt={post.description} />
          ))}
        </div>
    </div>
  )
}

export default Search