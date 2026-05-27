import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, addComment, updateLike, deletePost } from "../api/postService";
import PostDetail from "../components/post/PostDetail";
import ErrorMessage from "../components/ErrorMessage";

const Post = ({ user }) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getPost(postId)
            .then(data => {
                setPost(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
                setLoading(false);
            });
    }, [postId]);

    const handleUpdateLike = async (id) => {
        try {
            const updatedPost = await updateLike(id);
            setPost(updatedPost);
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
        }
    };

    const handleAddComment = async (id, text) => {
        try {
            const updatedPost = await addComment(id, text);
            setPost(updatedPost);
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await deletePost(id);
            navigate(`/profile/${user.id}`);
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (!post) return <p>No se pudo cargar el post.</p>;

    return (
        <>
            {error && <ErrorMessage message={error} />}
            <PostDetail
                post={post} 
                user={user} 
                isOwner={user?.id === post.user.id} 
                onAddComment={handleAddComment}
                onUpdateLike={handleUpdateLike}
                onDeletePost={handleDeletePost}
            />
        </>
    );
}

export default Post;