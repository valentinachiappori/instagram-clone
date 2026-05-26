import { useState } from 'react'
import '../../styles/components/userProfile/UserProfileHeader.css'
import Button from '../Button'
import { followUser } from '../../api/userService'

const UserProfileHeader = ({ user, isOwner }) => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
    const initiallyFollowing = (currentUser.followers || []).some(f => f.id === user.id)
    const [isFollowing, setIsFollowing] = useState(initiallyFollowing)

    const handleFollow = async () => {
        try {
            const updatedMe = await followUser(user.id)
            localStorage.setItem('user', JSON.stringify(updatedMe))
            setIsFollowing(!isFollowing)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="header">
            
            <img className="user-image" src={user.image} alt={user.name} />
            
            <div className="header-info">
                <div className="header-top">
                    <h3>{user.name}</h3>
                    {!isOwner && (
                        <Button type="button" onClick={handleFollow}>
                            {isFollowing ? 'Dejar de seguir' : 'Seguir'}
                        </Button>
                    )}
                </div>
                <div className="header-stats">
                    <span>{user.followers.length} Seguidos</span>
                    <span>{user.posts.length} publicaciones</span>
                </div>
            </div>
        </div>
    )
}

export default UserProfileHeader
