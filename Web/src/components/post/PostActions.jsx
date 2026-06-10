import "../../styles/components/PostActions.css";

const PostActions = ({ post, user, onUpdateLike, onCommentsClick, className = "", isLiked: isLikedProp, likesCount: likesCountProp }) => {
    const isLiked = isLikedProp ?? post.likes.some(u => u.id === user?.id);
    const likesCount = likesCountProp ?? post.likes.length;

    return (
        <div className={`post-actions ${className}`}>
            <div className={`action-item ${isLiked ? 'liked' : ''}`} onClick={() => onUpdateLike(post.id)}>
                <i className={`bi ${isLiked ? 'bi-heart-fill text-danger' : 'bi-heart'} action-icon`}></i>
                <span className="action-text">{likesCount} Me gusta</span>
            </div>
            <div
                className="action-item"
                onClick={onCommentsClick}
                style={{ cursor: onCommentsClick ? 'pointer' : 'default' }}
            >
                <i className="bi bi-chat-left-text action-icon"></i>
                <span className="action-text">{post.comments.length} Comentarios</span>
            </div>
        </div>
    );
};

export default PostActions;