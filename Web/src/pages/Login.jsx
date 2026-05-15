import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import loginImage from "../assets/login.png";
import Button from "../components/Button";
import Input from "../components/Input";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/Login.css";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await login(email, password);
            const authHeader = response.headers["authorization"] || "";
            const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(response.data));
            onLogin(response.data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-wrapper">

                <div className="login-collage">
                    <img src={loginImage} alt="login" />
                </div>

                <div className="login-panel">
                    <h1 className="login-logo">Instagram</h1>
                    <ErrorMessage message={error} />
                    <form className="login-form" onSubmit={handleSubmit}>
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
                        <Button type="submit" className="w-100" disabled={loading}>
                            {loading ? "Ingresando..." : "Iniciar sesión"}
                        </Button>
                    </form>
                    <div className="login-divider" />
                    <p className="login-register">
                        ¿No tenés cuenta? <br />
                        <Link to="/register">Registrate</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;