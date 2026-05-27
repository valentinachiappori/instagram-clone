import { useState } from 'react';
import { Link } from 'react-router-dom';
import { updateLike } from "../api/postService";
import '../styles/components/PostCard.css';
import PostHeader from '../components/post/PostHeader';
import ErrorMessage from './ErrorMessage';

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser || !post.likes) return false;
    
    return post.likes.some(likeUser => likeUser.id === currentUser.id);
  });

  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [likeError, setLikeError] = useState(null);

  const handleLike = async () => {
    const previousIsLiked = isLiked;
    const previousLikesCount = likesCount;

    setIsLiked(!previousIsLiked);
    setLikesCount(previousIsLiked ? previousLikesCount - 1 : previousLikesCount + 1);
    setLikeError(null);

    try {
      await updateLike(post.id);
    } catch (error) {
      setIsLiked(previousIsLiked);
      setLikesCount(previousLikesCount);
      setLikeError(error.response?.data?.error || error.response?.data?.errors?.[0] || error.message);
    }
  };

  return (
    <article className="post-card">
      <PostHeader postUser={post.user} date={post.date} />
      {likeError && <ErrorMessage message={likeError} />}

      <Link to={`/post/${post.id}`} className="post-image-link">
        <div className="post-image-container">
          <img src={post.image} alt="Publicación" className="post-image" />
        </div>
      </Link>

      <div className="post-actions">
        <div className={`action-item ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
          <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'} action-icon`}></i>
          <span>{likesCount} Me gusta</span>
        </div>

        <Link to={`/post/${post.id}`} className="action-item action-link">
          <i className="bi bi-chat-right-text action-icon"></i>
          <span>{post.comments?.length || 0} Comentarios</span>
        </Link>
      </div>

      <div className="post-description">
        <p>
          <span style={{ fontWeight: '600', marginRight: '8px' }}>{post.user?.name}</span>
          {post.description}
        </p>
      </div>
    </article>
  );
};

export default PostCard;