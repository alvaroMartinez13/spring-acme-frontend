export const getUsernameFromToken = (token) => {
    if (!token) return null; 

    try {
        const payloadBase64 = token.split(".")[1]; 
        const decodedPayload = JSON.parse(atob(payloadBase64));

        return decodedPayload.sub;
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};
