import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import loginImage from "../assets/login.png";
import "../styles/Login.css";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            localStorage.setItem("token", response.headers["authorization"]);
            localStorage.setItem("user", JSON.stringify(response.data));
            onLogin(response.data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Error al iniciar sesión");
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
                    {error && <div className="login-error">{error}</div>}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="login-input"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="login-input"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="login-btn">
                            Iniciar sesión
                        </button>
                    </form>
                    <div className="login-divider" />
                    <p className="login-register">
                        ¿No tenés cuenta? <Link to="/register">Registrate</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;