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
                    {post.description && (
                        <div className="main-comment">
                            <img src={post.user.image} alt={post.user.name} className="user-profile" />
                            <p className="post-description">
                                <strong>{post.user.name}</strong> {post.description}
                            </p>
                        </div>
                    )}

                    <div className="placeholder-comments">
                        {post.comments && post.comments.map((comment) => (
                            <div key={comment.id} className="comment-item">
                                <Link to={`/profile/${comment.user.id}`}>
                                    <img src={comment.user.image} className="user-profile" alt={comment.user.name} />
                                </Link>
                                <p className="post-description">
                                    <Link to={`/profile/${comment.user.id}`}>
                                        <strong>{comment.user.name}</strong> 
                                    </Link>
                                    {" "}{comment.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="post-actions">
                        <div className="action-item">
                            <i className="bi bi-heart action-icon"></i>
                            <span className="action-text">{post.likes.length} Me gusta</span>
                        </div>
                        <div className="action-item">
                            <i className="bi bi-chat-left-text action-icon"></i>
                            <span className="action-text">{post.comments.length} Comentarios</span>
                        </div>
                </div>

                <div className="comment-input-container">
                    <textarea 
                        placeholder="Agregá un comentario..." 
                        className="comment-input"
                        rows="1"
                    ></textarea>
                </div>
                <button className="publish-button">Publicar</button>
            </div>
        </article>
    );
};

export default Post;