import { getUsernameFromToken } from "../Utils/auth.js";

export const getPosts = async () => {
    try {

        const token = localStorage.getItem("token");

        const username = getUsernameFromToken(token);

        const response = await fetch(`http://localhost:8080/posts/following/${username}`, {
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

export const getMyPosts = async () => {

    try {

        const token = localStorage.getItem("token");

        const username = getUsernameFromToken(token);

        const response = await fetch(`http://localhost:8080/posts/myPosts/${username}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Posts');
        }

        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }

}

export const newPost = async (postData) => {

    try {

        const token = localStorage.getItem("token");

        const username = getUsernameFromToken(token);

        const response = await fetch(`http://localhost:8080/posts/${username}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Posts');
        }

        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }

}

export const getPost = async (id) => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:8080/posts/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Posts');
        }

        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }

}

export const updatePost = async (postData, id) => {

    try {

        const token = localStorage.getItem("token");

        const username = getUsernameFromToken(token);

        const response = await fetch(`http://localhost:8080/posts/${username}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(postData)

        });

        if (!response.ok) {
            throw new Error('Failed to fetch Posts');
        }

        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }

}

export const deletePost = async (id) => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:8080/posts/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Posts');
        }

        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }

}

