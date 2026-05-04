import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, addComment, updateLike } from "../api/postService";
import PostDetail from "../components/post/PostDetail";
import ErrorMessage from "../components/ErrorMessage";

const Post = ({ user }) => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPost(postId).then(data => setPost(data));
    }, [postId]);

    const handleUpdateLike = async (postId) => {
        try {
            const updatedPost = await updateLike(postId);
            setPost(updatedPost);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || "No se pudo dar like");
        }
    };

    const handleAddComment = async (id, text) => {
    try {
        const updatedPost = await addComment(id, text);
        setPost(updatedPost);
        setError(null);
    } catch (err) {
        setError(err.response?.data?.error || "Error al añadir comentario");
    }
};

    if (!post) return <p>Cargando...</p>;

    return (
        <div>
        <ErrorMessage message={error} />
        <PostDetail
            post={post} 
            user={user} 
            isOwner={user?.id === post.user.id} 
            onAddComment={handleAddComment}
            onUpdateLike={handleUpdateLike}
        />
        </div>
    );
}

export default Post;