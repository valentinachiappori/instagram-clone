import { useState } from "react";
import "../../styles/components/addPost/ImagePreview.css";

const ImagePreview = ({ url }) => {
    const [previewOk, setPreviewOk] = useState(false);

    const showPreview = url.trim() !== "" && previewOk;

    return (
        <div className="addpost-preview-section">
            <div className="addpost-preview-label">Preview</div>
            <div className="addpost-preview-box">
                {url && (
                    <img
                        src={url}
                        alt="preview"
                        className="addpost-preview-image"
                        style={{ display: showPreview ? "block" : "none" }}
                        onLoad={() => setPreviewOk(true)}
                        onError={() => setPreviewOk(false)}
                    />
                )}
                {!showPreview && (
                    <div className="addpost-preview-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 7h3l2-2h8l2 2h3v12H3z" />
                            <circle cx="12" cy="13" r="3.5" />
                            <path d="M18 8.5h.01" />
                            <path d="M20 4v3M21.5 5.5h-3" strokeLinecap="round" />
                        </svg>
                        <span>Agregar imagen</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImagePreview;
