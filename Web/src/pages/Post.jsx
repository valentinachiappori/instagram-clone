import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, addComment, updateLike, deletePost } from "../api/postService";
import PostDetail from "../components/post/PostDetail";
import ErrorMessage from "../components/ErrorMessage";

const Post = ({ user }) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPost(postId)
            .then(data => {
                setPost(data);
                setError(null);
            })
            .catch((err) => {
                setPost(null);
                setError(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
            });
    }, [postId]);

    const handleUpdateLike = async (postId) => {
        try {
            const updatedPost = await updateLike(postId);
            setPost(updatedPost);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
        }
    };

    const handleAddComment = async (id, text) => {
        try {
            const updatedPost = await addComment(id, text);
            setPost(updatedPost);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await deletePost(id);
            setError(null);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
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
            onDeletePost={handleDeletePost}
        />
        </div>
    );
}

export default Post;