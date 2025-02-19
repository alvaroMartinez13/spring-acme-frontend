import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { getMyPosts } from "../Services/PostService";
import PostBase from "../Components/PostBase";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import '../Styles/profile.css';

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

const UserProfilePage = () => {
    const { user, updateUser, fetchUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState({ ...user });
    const [profileImage, setProfileImage] = useState(user?.profilePicture);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            const userPosts = await getMyPosts();
            setPosts(userPosts);
        };
        if (user) {
            fetchPosts();
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            setUserData({ ...user });
            setProfileImage(user?.profilePicture);
        }
    }, [user]);

    const handleEdit = () => {
        setEditing(!editing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        await updateUser(userData);
        await fetchUser(localStorage.getItem("token"));
        setEditing(false);
    };

    const handleImageChange = (e) => {
        const value = e.target.value;
        setProfileImage(value);
        setUserData((prev) => ({ ...prev, profilePicture: value }));
    };

    return (
        <>
            <Navbar />
            <div className="pt-20 px-5">
                <div id="contentProfile" className="max-w-4xl mx-auto bg-white p-5 rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row items-center space-x-4">
                        <img
                            src={user?.profilePicture}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover sm:w-32 sm:h-32"
                        />
                        <div className="flex-1 mt-4 sm:mt-0">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold">{user?.name}</h2>
                                <button id="buttonChange"
                                    onClick={handleEdit}
                                    className="text-sm text-blue-500 hover:text-blue-700"
                                >
                                    {editing ? "Cancelar" : "Editar"}
                                </button>
                            </div>
                            {editing ? (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Nombre:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder="Ingresa tu nombre"
                                    />

                                    <label className="block text-sm font-medium text-gray-700 mt-2">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                                        placeholder="Ingresa tu email"
                                    />

                                    <label className="block text-sm font-medium text-gray-700 mt-2">Teléfono:</label>
                                    <input
                                        type="text"
                                        name="celphone"
                                        value={userData.celphone}
                                        onChange={handleChange}
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                                        placeholder="Ingresa tu número de teléfono"
                                    />

                                    <label className="block text-sm font-medium text-gray-700 mt-2">Fecha de Nacimiento:</label>
                                    <input
                                        type="date"
                                        name="dateBirth"
                                        value={userData.dateBirth?.split('T')[0]}
                                        onChange={handleChange}
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                                    />

                                    <label className="block text-sm font-medium text-gray-700 mt-2">Biografía:</label>
                                    <textarea
                                        name="bibliography"
                                        value={userData?.bibliography}
                                        onChange={handleChange}
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                                        placeholder="Escribe tu biografía..."
                                    />

                                    <label className="block text-sm font-medium text-gray-700 mt-2">Imagen de Perfil (URL):</label>
                                    <input
                                        type="text"
                                        name="profilePicture"
                                        value={userData.profilePicture}
                                        onChange={handleImageChange}
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                                        placeholder="Ingresa la URL de tu imagen de perfil"
                                    />

                                    <div className="mt-4 flex gap-4">
                                        <button
                                            onClick={handleSave}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={() => setEditing(false)}
                                            className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <p><strong>Username:</strong> {user?.username}</p>
                                    <p><strong>Email:</strong> {user?.email}</p>
                                    <p><strong>Celphone:</strong> {user?.celphone}</p>
                                    <p><strong>Fecha de Nacimiento:</strong> {formatDate(user?.dateBirth)}</p>
                                    <p><strong>Biografía:</strong> {user?.bibliography}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div id="container" className="mt-10">
                    <h2 className="text-xl font-semibold mb-4">Tus Publicaciones</h2>
                    <button className="bg-green-400 text-white text-sm px-3 py-2 rounded-md shadow-md hover:bg-green-600">
                        📖 New Post
                    </button>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <PostBase key={post.id}
                                username={post.username}
                                imageUrl={post.imageUrl}
                                description={post.description}
                                imageProfile={post.imageProfile}
                                idPost={post.id} usernameUser={user.username}
                            />
                        ))
                    ) : (
                        <p>No has realizado ninguna publicación aún.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserProfilePage;
