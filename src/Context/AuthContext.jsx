import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { getUsernameFromToken } from "../Utils/auth.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser(token);
        }
    }, []);

    const fetchUser = async (token) => {
        const username = getUsernameFromToken(token);

        if (!username) return;

        const res = await fetch(`http://localhost:8080/api/users/${username}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setUser(data);
    };

    const login = async (credentials) => {
        const res = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });
        const data = await res.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            fetchUser(data.token);
            navigate("/home");
        }
    };

    const register = async (userData) => {
        const res = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await res.json();
        if (data.token) {
            localStorage.setItem("token", data.token);

            await fetchUser(data.token);
            navigate("/home");
        }
    };

    const updateUser = async (userData) => {

        const token = localStorage.getItem("token");

        const username = getUsernameFromToken(token);

        const res = await fetch(`http://localhost:8080/api/users/${username}`, {
            method: "PATCH",
            headers: {
                 "Content-Type": "application/json",
                 Authorization: `Bearer ${token}`
             },
            body: JSON.stringify(userData),
        });

        const data = await res.json();
        setUser(data);

    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, updateUser, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};
