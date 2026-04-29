import { useEffect, useState } from 'react'
import { getUser } from '../../api/userService'
import UserProfileHeader from '../../components/userProfile/UserProfileHeader'
import UserProfileBody from '../../components/userProfile/UserProfileBody'

const UserProfileLogged = ({ userId }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser(userId).then(data => setUser(data))
    }, [userId])

    if (!user) return <p>Cargando...</p>

    return (
        <div>
            <UserProfileHeader user={user} isOwner={false} />
            <UserProfileBody posts={user.posts} />
        </div>
    )
} 


export default UserProfileLogged;