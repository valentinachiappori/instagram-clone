import "../../styles/components/PostHeader.css";
import { Link } from "react-router-dom";

const PostHeader = ({ postUser, date, className = ""}) => {
    
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
        </header>
    );
};

export default PostHeader;