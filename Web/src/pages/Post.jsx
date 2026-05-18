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
        setError(null);
        setPost(null);

        getPost(postId)
            .then(data => {
                setPost(data);
                setError(null);
            })
            .catch(() => {
                setPost(null);
                setError("Post no encontrado");
            });
    }, [postId]);

    const handleUpdateLike = async (postId) => {
        try {
            const updatedPost = await updateLike(postId);
            setPost(updatedPost);
            setError(null);
        } catch {
            setError("No se pudo dar like");
        }
    };

    const handleAddComment = async (id, text) => {
    try {
        const updatedPost = await addComment(id, text);
        setPost(updatedPost);
        setError(null);
    } catch {
        setError("Error al añadir comentario");
    }
};

    if (error && !post) return <ErrorMessage message={error} />;
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