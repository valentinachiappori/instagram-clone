import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, editPost } from "../api/postService";
import PostForm from "../components/PostForm";
import Button from "../components/Button";
import { object, string } from "yup";

const editPostSchema = object({
    description: string().required("La descripción es obligatoria"),
    image: string().required("La imagen es obligatoria").url("La imagen debe ser una URL válida"),
});

const EditPost = ({ user }) => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        getPost(postId)
            .then(data => {
                if (cancelled) return;
                if (data.user.id !== user?.id) {
                    navigate(`/post/${postId}`);
                    return;
                }
                setDescription(data.description || "");
                setImage(data.image || "");
                setLoading(false);
            })
            .catch((err) => {
                if (cancelled) return;
                if (err.response?.status === 401) { navigate('/login'); return; }
                setError(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
                setLoading(false);
            });

        return () => { cancelled = true; };
    }, [postId, user, navigate]);

    const handleSubmit = async () => {
        setError(null);

        try {
            editPostSchema.validateSync({ description, image });
        } catch (validationError) {
            setError(validationError.message);
            return;
        }

        setSaving(true);
        try {
            await editPost(postId, description, image);
            navigate(`/post/${postId}`);
        } catch (err) {
            if (err.response?.status === 401) { navigate('/login'); return; }
            setError(
                err.response?.data?.errors?.[0] ||
                err.response?.data?.error ||
                err.message
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <PostForm
            imageUrl={image}
            onImageUrlChange={setImage}
            description={description}
            onDescriptionChange={setDescription}
            onSubmit={handleSubmit}
            error={error}
        >
            <div className="edit-post-actions">
                <Button
                    type="button"
                    className="btn-secondary"
                    onClick={() => navigate(`/post/${postId}`)}
                    disabled={saving}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    className="publish-button"
                    disabled={saving}
                >
                    {saving ? "Guardando..." : "Guardar cambios"}
                </Button>
            </div>
        </PostForm>
    );
};

export default EditPost;
