import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";
import Button from "../components/Button";
import Input from "../components/Input";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/Register.css";
import { storageService } from "../api/storageService"
import { object, string } from "yup";

const registerSchema = object({
    name: string().required("El nombre es obligatorio"),
    email: string().required("El email es obligatorio").email("El email no tiene un formato válido"),
    password: string().required("La contraseña es obligatoria").min(5, "La contraseña tiene menos de 5 caracteres").max(32, "La contraseña supera los 32 caracteres"),
    image: string().required("La imagen es obligatoria").url("La imagen debe ser una URL válida"),
});

const Register = ({ onLogin }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            registerSchema.validateSync({ name, email, password, image });
        } catch (validationError) {
            setError(validationError.message);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await register(name, email, password, image);
            const authHeader = response.headers["authorization"] || "";
            const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
            storageService.setToken(token);
            storageService.setUser(response.data);
            onLogin(response.data);
            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.error ||
                err.response?.data?.errors?.[0] ||
                err.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-panel">
                <h1 className="register-logo">Instagram</h1>
                <p className="register-subtitle">
                    Regístrate para ver fotos y videos de tus amigos.
                </p>
                <form className="register-form" onSubmit={handleSubmit} noValidate>
                    {error && <ErrorMessage message={error} />}
                    <Input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-100"
                    />
                    <Input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-100"
                    />
                    <Input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-100"
                    />
                    <Input
                        type="url"
                        placeholder="Imagen (URL)"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-100"
                    />
                    <Button type="submit" className="w-100" disabled={loading}>
                        {loading ? "Registrando..." : "Registrate"}
                    </Button>
                </form>
                <p className="register-terms">
                    Al registrarte, aceptas nuestras{" "}
                    <Link to="#">Condiciones</Link>, la{" "}
                    <Link to="#">Política de Privacidad</Link> y la{" "}
                    <Link to="#">Política de cookies</Link>.
                </p>
                <div className="register-divider" />
                <p className="register-login">
                    ¿Tienes una cuenta? <br />
                    <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;