
export const countCommentsByPost = async (id) => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:8080/api/comments/post/${id}/count`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const commCount = await response.json();
        return commCount;

    } catch (error) {
        console.error("Error fetching users not followed:", error);
        throw error;
    }

}