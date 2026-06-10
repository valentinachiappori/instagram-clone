import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateLike } from "../api/postService";
import PostHeader from '../components/post/PostHeader';
import ErrorMessage from './ErrorMessage';
import PostActions from './post/PostActions';
import "../styles/components/PostCard.css";

const PostCard = ({ post, currentUser }) => {
  
  const [isLiked, setIsLiked] = useState(() => {
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
        <img src={post.image} alt="Publicación" className="post-image" />
      </Link>

      
        <PostActions
          post={post}
          isLiked={isLiked}
          likesCount={likesCount}
          onUpdateLike={handleLike}
          onCommentsClick={() => navigate(`/post/${post.id}`)}
        />


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