import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, editPost } from "../api/postService";
import PostForm from "../components/PostForm";
import Button from "../components/Button";

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
                setError(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
                setLoading(false);
            });

        return () => { cancelled = true; };
    }, [postId, user, navigate]);

    const handleSubmit = async () => {
        if (!image.trim() || !URL.canParse(image)) {
            setError("La imagen debe ser una URL válida");
            return;
        }
        setSaving(true);
        try {
            await editPost(postId, description, image);
            navigate(`/post/${postId}`);
        } catch (err) {
            setError(
                err.response?.data?.errors?.[0] ||
                err.response?.data?.error ||
                err.message
            );
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
