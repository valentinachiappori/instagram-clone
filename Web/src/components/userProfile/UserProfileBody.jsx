const UserProfileBody = ({ posts }) => {
    return (
        <div >
            {posts.map(post => (
                <img key={post.id} src={post.image} alt={post.description} />
            ))}
        </div>
    )
}

export default UserProfileBody
