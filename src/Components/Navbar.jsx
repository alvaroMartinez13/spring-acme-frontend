import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import '../Styles/post.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/profile");
    };
    
    const handleHomeClick = () => {
        navigate("/home");
    };

    return (
        <nav className="bg-teal-600 text-white flex justify-between items-center px-4 py-1 fixed w-full z-10">
            <div className="flex items-center space-x-2 sm:space-x-2">
                <img
                    src="https://cdn.pixabay.com/photo/2019/11/25/06/21/leaf-4651088_1280.jpg"
                    alt="Logo"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <h1 className="text-base font-bold hidden md:block">SOCIAL LEAF</h1>
            </div>

            <div className="flex items-center gap-4">

                <button className="relative cursor-pointer"
                    onClick={handleHomeClick}
                >
                    🏠
                </button>

                <button className="relative cursor-pointer">
                    🔔 <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full px-1">30</span>
                </button>

                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="relative font-bold flex justify-center items-center gap-2 text-sm md:text-base"
                >
                    {user?.name}
                    <img
                        src={user?.profilePicture}
                        alt="User Profile"
                        className="w-8 h-8 rounded-full object-cover border-2 border-white/200"
                    />
                </button>

                {dropdownOpen && (
                    <div className="absolute top-10 right-18 mt-2 bg-white text-black p-2 shadow-md rounded-md w-48 max-h-60 overflow-y-auto z-20">
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={handleProfileClick} 
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
                                >
                                    Ver Perfil
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                )}

                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
