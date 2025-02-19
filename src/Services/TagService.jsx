import { getUsernameFromToken } from "../Utils/auth.js";

export const addTag = async (tag) => {
    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:8080/api/tag`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(tag)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Posts');
        }

        const postFollowing = await response.json();
        return postFollowing;
    } catch (error) {
        console.error("Error fetching posts following:", error);
        throw error;
    }
}

export const deleteTag = async (id) => {
    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:8080/api/tag/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Posts');
        }

        const postFollowing = await response.json();
        return postFollowing;
    } catch (error) {
        console.error("Error fetching posts following:", error);
        throw error;
    }
}
