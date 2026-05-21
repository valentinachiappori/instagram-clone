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
        let cancelled = false;

        getUser(id)
            .then(data => {
                if (cancelled) return;
                setUser(data);
                setError(null);
            })
            .catch((err) => {
                if (cancelled) return;
                setUser(null);
                setError(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
            });

        return () => { cancelled = true; };
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