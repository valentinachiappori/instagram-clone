import "../styles/components/Button.css";
const Button = ({ children, onClick, type = "submit", disabled = false, className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`app-btn ${className}`}
        >
            {children}
        </button>
    );
};
export default Button;