import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import ThemeToggle from "../Components/ThemeToggle"; 
import '../Styles/index.css';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!credentials.username || !credentials.password) {
            setError("Todos los campos son obligatorios");
            return;
        }

        setError("");
        login(credentials);
        navigate("/home");
    };

    return (
        <div id="root" className="flex flex-col items-center justify-center min-h-screen bg-gray-100 transition">
            
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-200 p-8 rounded-lg shadow-md w-11/12 max-w-md transition">
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-900">Login</h2>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <input
                    name="username"
                    onChange={handleChange}
                    placeholder="Username"
                    className="input w-full mb-3 p-2 border rounded"
                />

                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    className="input w-full mb-3 p-2 border rounded"
                />

                <button className="btn-primary w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                    Ingresar
                </button>

                <p className="text-sm text-gray-600 dark:text-gray-900 mt-4 text-center">
                    ¿No tienes cuenta? <a href="/register" className="text-blue-500 hover:underline">Regístrate aquí</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
