import "../../styles/components/PostActions.css";

const PostActions = ({ post, user, onUpdateLike, className = "" }) => {
    const isLiked = post.likes.some(u => u.id === user?.id);

    return (
        <div className= {`post-actions ${className}`}>
            <div className="action-item" onClick={() => onUpdateLike(post.id)}>
                <i className={`bi ${isLiked ? 'bi-heart-fill text-danger' : 'bi-heart'} action-icon`}></i>
                <span className="action-text">{post.likes.length} Me gusta</span>
            </div>
            <div className="action-item">
                <i className="bi bi-chat-right-text action-icon"></i>
                <span className="action-text">{post.comments.length} Comentarios</span>
            </div>
        </div>
    );
};

export default PostActions;