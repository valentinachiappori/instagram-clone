import '../../styles/components/userProfile/UserProfileHeader.css'
import Button from '../Button'

const UserProfileHeader = ({ user, isOwner }) => {
    return (
        <div className="header">
            
            <img className="user-image" src={user.image} alt={user.name} />
            
            <div className="header-info">
                <div className="header-top">
                    <h3>{user.name}</h3>
                    {!isOwner && <Button type="button">Seguir</Button>}
                </div>
                <div className="header-stats">
                    <span>{user.followers.length} Seguidores</span>
                    <span>{user.posts.length} publicaciones</span>
                </div>
            </div>
        </div>
    )
}

export default UserProfileHeader
