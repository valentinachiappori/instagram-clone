import { useEffect, useState } from 'react'
import { getUser } from '../../api/userService'
import UserProfileHeader from '../../components/userProfile/UserProfileHeader'
import UserProfileBody from '../../components/userProfile/UserProfileBody'
import { useParams, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';

const UserProfile = ({ userIdViewer = false, currentUser, onUpdateUser }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let cancelled = false;

        setLoading(true);
        setError(null);
        setUser(null);

        getUser(id)
            .then(data => {
                if (cancelled) return;
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                if (cancelled) return;
                if (err.response?.status === 401) { navigate('/login'); return; }
                setError(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
                setLoading(false);
            });

        return () => { cancelled = true; };
    }, [id, navigate])

    if (loading) return <p>Cargando...</p>
    if (error || !user) return <ErrorMessage message={error || "No se encontró el usuario."} />

    return (
        <div>
            <UserProfileHeader 
                user={user} 
                isOwner={String(id) === String(userIdViewer)} 
                currentUser={currentUser}
                onUpdateUser={onUpdateUser}
            />
            <UserProfileBody posts={user.posts} />
        </div>
    )
}


export default UserProfile;