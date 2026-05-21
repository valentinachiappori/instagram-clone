import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, editPost } from "../api/postService";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/PostDetail.css";
import "../styles/EditPost.css";

const EditPost = ({ user }) => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPost(postId)
            .then(data => {
                if (data.user.id !== user?.id) {
                    navigate(`/post/${postId}`);
                    return;
                }
                setDescription(data.description || "");
                setImage(data.image || "");
                setLoading(false);
            })
            .catch((err) => {
                setError(err.response?.data?.error || err.response?.data?.errors?.[0] || err.message);
                setLoading(false);
            });
    }, [postId, user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
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
        <article className="post-container">

            <div className="post-image">
                <p className="edit-post-preview-label">Preview</p>
                {image
                    ? <img src={image} alt="preview" className="main-image" />
                    : <div className="edit-post-image-placeholder">Sin imagen</div>
                }
            </div>

            <div className="post-details">
                <form className="edit-post-form" onSubmit={handleSubmit}>
                    <ErrorMessage message={error} reserveSpace />

                    <input
                        type="url"
                        placeholder="URL de la imagen"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="app-input w-100"
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
                            disabled={saving || !image}
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
