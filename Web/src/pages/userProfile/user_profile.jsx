import { useEffect, useState } from 'react'
import { getUser } from '../../api/userService'
import UserProfileHeader from '../../components/userProfile/UserProfileHeader'
import UserProfileBody from '../../components/userProfile/UserProfileBody'
import { useParams } from 'react-router-dom';

const UserProfile = ({ userIdViewer = false }) => {

    const [user, setUser] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        getUser(id).then(data => setUser(data))
    }, [id])

    if (!user) return <p>Cargando...</p>

    return (
        <div>
            <UserProfileHeader user={user} isOwner={id == userIdViewer} />
            <UserProfileBody posts={user.posts} />
        </div>
    )
} 


export default UserProfile;