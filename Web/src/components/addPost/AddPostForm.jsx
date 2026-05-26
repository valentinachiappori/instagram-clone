import { useState } from "react";
import Input from "../Input";
import ErrorMessage from "../ErrorMessage";
import "../../styles/components/addPost/AddPostForm.css";

const AddPostForm = ({ imageUrl, onImageUrlChange, onSubmit, loading, error }) => {
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(imageUrl, description);
    };

    return (
        <form className="addpost-form" onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Url de la imagen"
                value={imageUrl}
                onChange={(e) => onImageUrlChange(e.target.value)}
                className="w-100"
            />
            <textarea
                className="addpost-textarea"
                placeholder="Agrega descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" className="addpost-submit" disabled={loading}>
                {loading ? "Publicando..." : "Publicar"}
            </button>
            <ErrorMessage message={error} />
        </form>
    );
};

export default AddPostForm;
