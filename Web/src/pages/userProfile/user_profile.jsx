import { useEffect, useState } from 'react'
import { getUser } from '../../api/userService'
import UserProfileHeader from '../../components/userProfile/UserProfileHeader'
import UserProfileBody from '../../components/userProfile/UserProfileBody'
import { useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';

const UserProfile = ({ userIdViewer = false }) => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        getUser(id)
            .then(data => setUser(data))
            .catch(() => setError('Usuario no encontrado'))
    }, [id])

    if (error && !user) return <ErrorMessage message={error} />
    if (!user) return <p>Cargando...</p>

    return (
        <div>
            <UserProfileHeader user={user} isOwner={id === userIdViewer} />
            <UserProfileBody posts={user.posts} />
        </div>
    )
} 


export default UserProfile;