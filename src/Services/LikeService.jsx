
export const getLikes = async (id) => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:8080/api/likes/count/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });


        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const countLikes = await response.json();
        return countLikes;
    } catch (error) {
        console.error("Error fetching users not followed:", error);
        throw error;
    }

}

export const addLike = async (id, username) => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:8080/api/likes/post/${id}/user/${username}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });


        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const countLikes = await response.json();
        console.log(countLikes);
        return countLikes;
    } catch (error) {
        console.error("Error fetching users not followed:", error);
        throw error;
    }

}

export const removeLike = async (id, username) => {


    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:8080/api/likes/post/${id}/user/${username}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const countLikes = await response.json();
        return countLikes;
    } catch (error) {
        console.error("Error fetching users not followed:", error);
        throw error;
    }

}

export const getUserByLike = async (id, username) => {
    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:8080/api/likes/post/${id}/user/${username}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const userLike = await response.json();
        return userLike;

    } catch (error) {
        console.error("Error fetching users not followed:", error);
        throw error;
    }

}