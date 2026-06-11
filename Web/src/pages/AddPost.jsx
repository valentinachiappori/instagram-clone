import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import Button from "../components/Button";
import { createPost } from "../api/postService";
import { object, string } from "yup";

const createPostSchema = object({
    description: string().required("La descripción es obligatoria"),
    imageUrl: string().required("La imagen es obligatoria").url("Ingresá una URL de imagen válida"),
});

const AddPost = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError(null);

        try {
            createPostSchema.validateSync({ description, imageUrl });
        } catch (validationError) {
            setError(validationError.message);
            return;
        }
        setLoading(true);
        try {
            const post = await createPost(imageUrl, description);
            navigate(`/post/${post.id}`);
        } catch (err) {
            setError(err.response?.data?.errors?.[0] || err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PostForm
            imageUrl={imageUrl}
            onImageUrlChange={setImageUrl}
            description={description}
            onDescriptionChange={setDescription}
            onSubmit={handleSubmit}
            error={error}
        >
            <Button type="submit" className="publish-button" disabled={loading}>
                {loading ? "Publicando..." : "Publicar"}
            </Button>
        </PostForm>
    );
};

export default AddPost;
