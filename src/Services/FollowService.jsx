import { getUsernameFromToken } from "../Utils/auth.js";

export const followUser = async (followedUsername) => {

    try {

        const token = localStorage.getItem("token");

        const followerUsername = getUsernameFromToken(token);

        const response = await fetch(`http://localhost:8080/api/follows/${followerUsername}/follow/${followedUsername}`, {
            method: 'POST',
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

export const unfollowUser = async (followedUsername) => {

    try {

        const token = localStorage.getItem("token");

        const followerUsername = getUsernameFromToken(token);

        const response = await fetch(`http://localhost:8080/api/unfollows/${followerUsername}/follow/${followedUsername}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                
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