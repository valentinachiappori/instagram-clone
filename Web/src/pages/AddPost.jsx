import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImagePreview from "../components/addPost/ImagePreview";
import AddPostForm from "../components/addPost/AddPostForm";
import { createPost } from "../api/postService";
import "../styles/AddPost.css";

const AddPost = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (url, description) => {
        setError(null);
        if (!url.trim()) {
            setError("Ingresá la URL de la imagen");
            return;
        }
        setLoading(true);
        try {
            const post = await createPost(url, description);
            navigate(`/post/${post.id}`);
        } catch (err) {
            setError(err.response?.data?.errors?.[0] || "No se pudo publicar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="addpost-page">
            <div className="addpost-container">
                <ImagePreview url={imageUrl} />
                <AddPostForm
                    imageUrl={imageUrl}
                    onImageUrlChange={setImageUrl}
                    onSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                />
            </div>
        </div>
    );
};

export default AddPost;
