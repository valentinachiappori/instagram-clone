import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import loginImage from "../assets/login.png";
import "../styles/Login.css";

const Login = () => {
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
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Error al iniciar sesión");
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light overflow-hidden">
            <div className="d-flex align-items-center gap-2" style={{ width: "984px" }}>

                {/* Collage — oculto en móvil */}
                <div className="d-none d-md-flex login-collage" style={{ width: "700px", minWidth: "700px", height: "100vh" }}>
                    <img src={loginImage} alt="login" />
                </div>

                {/* Panel de login */}
                <div
                    className="d-flex flex-column align-items-center justify-content-center gap-2 px-5"
                    style={{ width: "528px", minWidth: "528px", minHeight: "100vh" }}
                >
                    <h1 className="login-logo text-center mb-2">Instagram</h1>

                    {error && (
                        <div className="alert alert-danger py-2 px-3 text-center" style={{ fontSize: "13px", maxWidth: "300px", width: "100%" }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-2" style={{ width: "300px" }}>
                        <input
                            type="email"
                            className="form-control login-input"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control login-input"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="btn login-btn text-white w-100">
                            Iniciar sesión
                        </button>
                    </form>

                    <hr className="w-100" style={{ maxWidth: "300px", borderColor: "#ccc" }} />

                    <p className="login-register mb-0 text-center">
                        ¿No tenés cuenta? <Link to="/register">Registrate</Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;