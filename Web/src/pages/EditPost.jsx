import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, editPost } from "../api/postService";
import Button from "../components/Button";
import Input from "../components/Input";
import { useToast } from "../components/ToastProvider";
import "../styles/PostDetail.css";
import "../styles/EditPost.css";

const EditPost = ({ user }) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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
                showToast(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
                setLoading(false);
            });

        return () => { cancelled = true; };
    }, [postId, user, navigate, showToast]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image.trim() || !URL.canParse(image)) {
            showToast("La imagen debe ser una URL válida");
            return;
        }
        setSaving(true);
        try {
            await editPost(postId, description, image);
            navigate(`/post/${postId}`);
        } catch (err) {
            showToast(
                err.response?.data?.errors?.[0] ||
                err.response?.data?.error ||
                err.message
            );
            setSaving(false);
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <article className="post-container">

            <div className="post-image edit-post-image">
                <p className="edit-post-preview-label">Preview</p>
                {image
                    ? <img src={image} alt="preview" className="main-image" />
                    : <div className="edit-post-image-placeholder">Sin imagen</div>
                }
            </div>

            <div className="post-details">
                <form className="edit-post-form" onSubmit={handleSubmit} noValidate>

                    <Input
                        type="url"
                        placeholder="URL de la imagen"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-100"
                    />

                    <textarea
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="app-input w-100 edit-post-description-input"
                    />

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
                </form>
            </div>

        </article>
    );
};

export default EditPost;
