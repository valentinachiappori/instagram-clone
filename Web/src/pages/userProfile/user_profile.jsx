import { useEffect, useState } from 'react'
import { getUser } from '../../api/userService'
import UserProfileHeader from '../../components/userProfile/UserProfileHeader'
import UserProfileBody from '../../components/userProfile/UserProfileBody'
import { useParams } from 'react-router-dom';
import { useToast } from '../../components/ToastProvider';

const UserProfile = ({ userIdViewer = false }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    const { showToast } = useToast();

    useEffect(() => {
        let cancelled = false;

        setUser(null);
        setLoading(true);

        getUser(id)
            .then(data => {
                if (cancelled) return;
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                if (cancelled) return;
                showToast(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
                setLoading(false);
            });

        return () => { cancelled = true; };
    }, [id])

    if (loading) return <p>Cargando...</p>
    if (!user) return <p>No se encontró el usuario.</p>

    return (
        <div>
            <UserProfileHeader user={user} isOwner={String(id) === String(userIdViewer)} />
            <UserProfileBody posts={user.posts} />
        </div>
    )
} 


export default UserProfile;