import '../styles/components/PostCard.css';
import PostHeader from '../components/post/PostHeader';

const PostCard = ({ post }) => {
  return (
    <article className="post-card">
      
      <PostHeader postUser={post.user} date={post.date} />

      <div className="post-image-container">
        <img src={post.image} alt="Publicación" className="post-image" />
      </div>

      <div className="post-actions">
        <div className="action-item">
          <i className="bi bi-heart action-icon"></i>
          <span>{post.likes?.length || 0} Me gusta</span>
        </div>
        <div className="action-item">
          <i className="bi bi-chat action-icon"></i>
          <span>{post.comments?.length || 0} Comentarios</span>
        </div>
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