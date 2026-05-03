import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";
import Button from "../components/Button";
import Input from "../components/Input";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/Register.css";

const Register = ({ onLogin }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register(name, email, password, image);
            localStorage.setItem("token", response.headers["authorization"]);
            localStorage.setItem("user", JSON.stringify(response.data));
            onLogin(response.data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Error al registrarse");
        }
    };

    return (
        <div className="register-page">
            <div className="register-panel">
                <h1 className="register-logo">Instagram</h1>
                <p className="register-subtitle">
                    Regístrate para ver fotos y videos de tus amigos.
                </p>
                <ErrorMessage message={error} />
                <form className="register-form" onSubmit={handleSubmit}>
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
                    <Button type="submit" className="w-100">
                        Registrate
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