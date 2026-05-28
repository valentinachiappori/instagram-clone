import { useEffect, useState } from 'react'
import { getUser } from '../../api/userService'
import UserProfileHeader from '../../components/userProfile/UserProfileHeader'
import UserProfileBody from '../../components/userProfile/UserProfileBody'
import { useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';

const UserProfile = ({ userIdViewer = false }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        let cancelled = false;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);

        getUser(id)
            .then(data => {
                if (cancelled) return;
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                if (cancelled) return;
                setError(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
                setLoading(false);
            });

        return () => { cancelled = true; };
    }, [id])

    if (loading) return <p>Cargando...</p>
    if (error) return <ErrorMessage message={error} />
    if (!user) return <p>No se encontró el usuario.</p>

    return (
        <div>
            <UserProfileHeader user={user} isOwner={String(id) === String(userIdViewer)} />
            <UserProfileBody posts={user.posts} />
        </div>
    )
} 


export default UserProfile;