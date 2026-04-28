import '../../styles/components/userProfile/UserProfileHeader.css'

const UserProfileHeader = ({ user, isOwner }) => {
    return (
        <div className="header">
            
            <img className="user-image" src={user.image} alt={user.name} />
            
            <div className="header-info">
                <div className="header-top">
                    <h3>{user.name}</h3>
                    {!isOwner && <button>Seguir</button>}
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
