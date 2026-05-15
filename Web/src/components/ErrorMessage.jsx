import "../styles/components/ErrorMessage.css";

const ErrorMessage = ({ message, reserveSpace = false }) => {
    if (!reserveSpace && !message) return null;

    return (
        <div className="error-message" style={!message ? { visibility: 'hidden' } : {}}>
            {message}
        </div>
    );
};

export default ErrorMessage;