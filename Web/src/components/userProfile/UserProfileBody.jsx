import { Link } from 'react-router-dom';
import '../../styles/components/userProfile/UserProfileBody.css'


const UserProfileBody = ({ posts }) => {
    return (
        <div className="grid" >
            {posts.map(post => (
                <Link to={`/post/${post.id}`} key={post.id}>
                    <img className="grid-item" src={post.image} alt={post.description} />
                </Link>
            ))}
        </div>
    )
}

export default UserProfileBody
