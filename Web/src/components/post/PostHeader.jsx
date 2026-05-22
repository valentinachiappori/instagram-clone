import "../../styles/components/PostHeader.css";
import { Link } from "react-router-dom";

const PostHeader = ({ postUser, date, isOwner, onEditClick, onDeleteClick, className = ""}) => {
    
    return (
        <header className={`post-header ${className}`}>
                    <Link to={`/profile/${postUser.id}`} className="user-info">
                        <img src={postUser.image} alt={postUser.name} className="user-profile" />
                        <div className="user-text">
                            <span className="username">{postUser.name}</span>
                            <span className="date">
                                {new Date(date).toLocaleString('es-AR', { 
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
                    {isOwner && (
                        <div className="header-actions">
                            <i  className="bi bi-trash-fill header-icon-delete"
                                onClick={onDeleteClick}
                                title="Eliminar publicación"
                            ></i>
                            <i  className="bi bi-pencil-fill header-icon-edit" 
                                onClick={onEditClick}
                                title="Editar publicación"
                            ></i>
                        </div>
                    )}
        </header>
    );
};

export default PostHeader;