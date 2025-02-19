import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import '../Styles/register.css';
import ThemeToggle from "../Components/ThemeToggle";

const RegisterPage = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        celphone: "",
        dateBirth: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio.";
        if (!formData.username.trim()) newErrors.username = "El nombre de usuario es obligatorio.";
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Correo electrónico inválido.";
        if (!/^\d{10}$/.test(formData.celphone)) newErrors.celphone = "Número de celular inválido.";

        const birthDate = new Date(formData.dateBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 14 || (age === 14 && today < new Date(birthDate.setFullYear(birthDate.getFullYear() + 14)))) {
            newErrors.dateBirth = "Debes tener al menos 14 años para registrarte.";
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[%$;&.,#]).{8,12}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = "La contraseña debe tener 8-12 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo especial (%$;&.,#).";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const { confirmPassword, ...userData } = formData;
        await register(userData);
        navigate("/home");
    };

    return (
        <div id="root" className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div id="Container" className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-center mb-6">Registro</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    {[
                        { label: "Nombre Completo", name: "name", type: "text" },
                        { label: "Nombre de Usuario", name: "username", type: "text" },
                        { label: "Correo Electrónico", name: "email", type: "email" },
                        { label: "Número de Celular", name: "celphone", type: "tel" },
                        { label: "Fecha de Nacimiento", name: "dateBirth", type: "date" },
                    ].map((field) => (
                        <div key={field.name} className="flex flex-col">
                            <label className="text-sm font-medium text-gray-400" htmlFor={field.name}>
                                {field.label}
                            </label>
                            <input
                                id={field.name}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
                        </div>
                    ))}

                    <div className="relative flex flex-col">
                        <label className="text-sm font-medium text-gray-400" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-600 text-sm"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🔓" : "🔒"}
                        </button>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="relative flex flex-col">
                        <label className="text-sm font-medium text-gray-400" htmlFor="confirmPassword">
                            Confirmar Contraseña
                        </label>
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-600 text-sm"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? "🔓" : "🔒"}
                        </button>
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                            Registrarse
                        </button>
                    </div>
                </form>


                <p className="text-sm text-center mt-4">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
