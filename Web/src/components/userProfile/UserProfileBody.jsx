import '../../styles/components/userProfile/UserProfileBody.css'


const UserProfileBody = ({ posts }) => {
    return (
        <div className="grid" >
            {posts.map(post => (
                <img className="grid-item" key={post.id} src={post.image} alt={post.description} />
            ))}
        </div>
    )
}

export default UserProfileBody
