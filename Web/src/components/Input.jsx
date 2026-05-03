import "../styles/components/Input.css";

const Input = ({ type = "text", placeholder, value, onChange, className = "" }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`app-input ${className}`}
        />
    );
};

export default Input;