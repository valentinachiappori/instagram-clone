import "../../styles/PostDetail.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../Button";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";

const PostDetail = ({ post, user, isOwner, onAddComment, onUpdateLike, onDeletePost }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [commentBody, setCommentBody] = useState('');
    const navigate = useNavigate();

    const handleDelete = () => {
        onDeletePost(post.id);
        setIsModalOpen(false);
    }; 

    const handlePublish = () => {
        if (commentBody.trim()) {
            onAddComment(post.id, commentBody);
            setCommentBody('');
        }
    };

    return (
        <article className="post-container">
            <div className="post-image">
                <img src={post.image} alt={post.description} className="main-image" />
            </div>

            <div className="post-details">
                <PostHeader 
                    postUser={post.user} 
                    date={post.date} 
                    isOwner={isOwner} 
                    postId={post.id} 
                    onEditClick={() => navigate(`/edit-post/${post.id}`)}
                    onDeleteClick={() => setIsModalOpen(true)}
                    className="post-page-header"/>

                {isModalOpen && (
                    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                            <h3 className="modal-title">Eliminar Posteo</h3>
                            <p className="modal-text">Estas seguro que quieres eliminar el post?</p>
                            <div className="modal-buttons-container">
                                <button className="btn-modal-cancel" onClick={() => setIsModalOpen(false)}>
                                    Cancelar
                                </button>
                                <button className="btn-modal-delete" onClick={handleDelete}>
                                    Borrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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
                                    {" "}{comment.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <PostActions post={post} user={user} onUpdateLike={onUpdateLike} className="post-page-actions" />

                <div className="comment-input-container">
                    <textarea 
                        placeholder="Agregá un comentario..." 
                        className="comment-input"
                        rows="1"
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                    ></textarea>
                </div>
                <Button 
                    className="publish-button"
                    onClick={handlePublish}
                    disabled={!commentBody.trim()}
                >
                    Publicar
                </Button>
            </div>
        </article>
    );
};

export default PostDetail;