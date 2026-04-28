import { useEffect,useState } from 'react'
import { getUser } from '../../services/userService'

const UserProfileLogged = ({ userId }) => {
    const [user, setUser] = useState(null);
    

    useEffect(() => {
        getUser(userId).then(data => {setUser(data)})
        

    }, [userId])

    if (!user) return <p>Cargando...</p>

    return (
        <div>
            <img src={user.image} alt={user.name} />
            <h2>{user.name}</h2>
            <h2>{user.followers.length}</h2>
            <h2>{user.posts.length}</h2>

            <div>
            {user.posts.map(post => (
                <img key={post.id} src={post.image} alt={post.id} />
            ))}
            </div>
        </div>
    )
} 


export default UserProfileLogged;