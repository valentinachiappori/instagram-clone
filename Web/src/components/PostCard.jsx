import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateLike } from "../api/postService";
import PostHeader from '../components/post/PostHeader';
import PostActions from './post/PostActions';
import "../styles/components/PostCard.css";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser || !post.likes) return false;
    
    return post.likes.some(likeUser => likeUser.id === currentUser.id);
  });

  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);

  const handleLike = async () => {
    const previousIsLiked = isLiked;
    const previousLikesCount = likesCount;

    setIsLiked(!previousIsLiked);
    setLikesCount(previousIsLiked ? previousLikesCount - 1 : previousLikesCount + 1);

    try {
      await updateLike(post.id);
    } catch (error) {
      console.error("Error al dar like:", error);
      setIsLiked(previousIsLiked);
      setLikesCount(previousLikesCount);
    }
  };

  return (
    <article className="post-card">
      <PostHeader postUser={post.user} date={post.date} />

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