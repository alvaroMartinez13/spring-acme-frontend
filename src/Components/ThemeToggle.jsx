import { useState, useEffect } from "react";
import "../Styles/index.css";

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            document.documentElement.style.backgroundColor = "#111827";
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.style.backgroundColor = "#f3f4f6";
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button
            id="buttonTheme"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Cambiar tema"
            className={`cursor-pointer px-3 py-2 rounded-lg transition-all text-lg sm:text-base flex items-center gap-2 shadow-md
                ${darkMode ? "bg-white text-gray-900" : "bg-gray-900 text-white"}
            `}
        >
            <span className="text-xs sm:text-base">
                {darkMode ? "☀️" : "🌙"}
            </span>
        </button>
    );
};

export default ThemeToggle;
