import { getUsernameFromToken } from "../Utils/auth.js";

export const getUsersNotFollowed = async () => {

    try {

        const token = localStorage.getItem("token");

        const username = getUsernameFromToken(token);

        const response = await fetch(`http://localhost:8080/api/follows/${username}/not-followed`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const users = await response.json();
        return users;
    } catch (error) {
        console.error("Error fetching users not followed:", error);
        throw error;
    }
};

export const getUserFollowing = async () => {

    try {

        const token = localStorage.getItem("token");

        const username = getUsernameFromToken(token);

        const response = await fetch(`http://localhost:8080/api/follows/${username}/following`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const users = await response.json();
        return users;
    } catch (error) {
        console.error("Error fetching users not followed:", error);
        throw error;
    }
}

export const searchUser = async (query) => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:8080/api/users/search?query=${query}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Error fetching users');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }

}

export const getUsers = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:8080/api/users`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching users');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }

}

