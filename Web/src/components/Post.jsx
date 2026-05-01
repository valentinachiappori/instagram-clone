import '../styles/Post.css';
import { Link } from 'react-router-dom';

const Post = ({ post, user, isOwner, onNavigate }) => {
    return (
        <article className="post-container">
            <div className="post-image">
                <img src={post.image} alt={post.description} className="main-image" />
            </div>

            <div className="post-details">
                <header className="post-header">
                    <Link to={`/profile/${post.user.id}`} className="user-info">
                        <img src={post.user.image} alt={post.user.name} className="user-profile" />
                        <div className="user-text">
                            <span className="username">{post.user.name}</span>
                            <span className="date">
                                {new Date(post.date).toLocaleString('es-AR', { 
                                    year: 'numeric', 
                                    month: '2-digit', 
                                    day: '2-digit',
                                    hour: '2-digit', 
                                    minute: '2-digit',
                                    hour12: false
                                }).replace(',', ' -')}
                            </span>
                        </div>
                    </Link>
                </header>

                <div className="separator"></div>

                <div className="comment-section">
                    <div className="main-comment">
                        <img 
                            src={post.user.image} 
                            alt={post.user.name} 
                            className="user-profile" 
                        />
                    <p className="post-description">
                        <strong>{post.user.name}</strong> {post.description}
                    </p>
                    </div>

                    <div className="placeholder-comments">
                        Comentarios
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Post;