import { useState } from "react";
import Input from "./Input";
import ErrorMessage from "./ErrorMessage";
import "../styles/PostDetail.css";
import "../styles/EditPost.css";

/**
 * Layout compartido para crear y editar posts.
 * Izquierda: preview de imagen. Derecha: formulario (URL + descripción).
 * Los botones se pasan como `children`.
 */
const PostForm = ({ imageUrl, onImageUrlChange, description, onDescriptionChange, onSubmit, error, children }) => {
    const [preview, setPreview] = useState({ url: "", ok: false });
    const showPreview = imageUrl.trim() !== "" && preview.url === imageUrl && preview.ok;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <article className="post-container">
            <div className="post-image edit-post-image">
                <p className="edit-post-preview-label">Preview</p>
                {imageUrl && (
                    <img
                        key={imageUrl}
                        src={imageUrl}
                        alt="preview"
                        className="main-image"
                        style={{ display: showPreview ? "block" : "none" }}
                        onLoad={() => setPreview({ url: imageUrl, ok: true })}
                        onError={() => setPreview({ url: imageUrl, ok: false })}
                    />
                )}
                {!showPreview && (
                    <div className="edit-post-image-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="72" height="72">
                            <path d="M3 7h3l2-2h8l2 2h3v12H3z" />
                            <circle cx="12" cy="13" r="3.5" />
                            <path d="M18 8.5h.01" />
                            <path d="M20 4v3M21.5 5.5h-3" strokeLinecap="round" />
                        </svg>
                        <span>Sin imagen</span>
                    </div>
                )}
            </div>

            <div className="post-details">
                <form className="edit-post-form" onSubmit={handleSubmit} noValidate>
                    {error && <ErrorMessage message={error} />}
                    <Input
                        type="url"
                        placeholder="URL de la imagen"
                        value={imageUrl}
                        onChange={(e) => onImageUrlChange(e.target.value)}
                        className="w-100"
                    />
                    <textarea
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => onDescriptionChange(e.target.value)}
                        className="app-input w-100 edit-post-description-input"
                    />
                    {children}
                </form>
            </div>
        </article>
    );
};

export default PostForm;
