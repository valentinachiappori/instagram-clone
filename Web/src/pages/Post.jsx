import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, addComment } from '../api/postService';
import PostDetail from '../components/PostDetail';

const Post = ({ user }) => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        getPost(postId).then(data => setPost(data));
    }, [postId]);

    const handleAddComment = (id, text) => {
        addComment(id, text).then(updatedPost => {
            setPost(updatedPost);
        });
    };

    if (!post) return <p>Cargando...</p>;

    return (
        <PostDetail
            post={post} 
            user={user} 
            isOwner={user?.id === post.user.id} 
            onAddComment={handleAddComment}
        />
    );
}

export default Post;