import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "../Components/Navbar";
import PostBase from "../Components/PostBase";
import SocialFollowCard from "../Components/SocialFollowCard";
import { getUsersNotFollowed, getUserFollowing } from '../Services/UserService';
import { getPosts } from '../Services/PostService';
import NewPost from '../Components/NewPost';
import "../Styles/post.css";

const HomePage = () => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [notFollowedUsers, setNotFollowedUsers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 657);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (user && user.username) {
            const fetchData = async () => {
                try {
                    const [usersNotFollowed, usersFollowing, userPosts] = await Promise.all([
                        getUsersNotFollowed(),
                        getUserFollowing(),
                        getPosts()
                    ]);
                    setNotFollowedUsers(usersNotFollowed);
                    setFollowing(usersFollowing);
                    setPosts(userPosts);
                } catch (error) {
                    console.error("Error obteniendo datos:", error);
                }
            };

            fetchData();
        }
    }, [user]);

    const updateLists = async () => {
        try {
            const [usersNotFollowed, usersFollowing] = await Promise.all([
                getUsersNotFollowed(),
                getUserFollowing()
            ]);
            setNotFollowedUsers(usersNotFollowed);
            setFollowing(usersFollowing);
        } catch (error) {
            console.error("Error actualizando listas de seguimiento:", error);
        }
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <div className="min-h-screen flex flex-col ">
            <Navbar />

            <div className="grid grid-cols-9 gap-4 px-2 py-2 pt-4 flex-grow mt-12 bg-teal-200">

                {!isMobile && (
                    <aside className="col-span-2 bg-white/40 p-4 rounded-lg shadow-md self-start sticky top-0">
                        <div className="flex flex-col items-center gap-2">
                            <img
                                src={user?.profilePicture}
                                alt="User Profile"
                                className="w-50 h-40 rounded-md object-cover border-2 border-white"
                            />
                            <h2 className="text-sm font-bold">{user?.name}</h2>
                            <p className="text-gray-500">@{user?.username}</p>
                            <hr className="w-full" />
                            <h2 className="font-bold text-sm">Personas que sigues</h2>

                            <section className="pt-4 flex flex-col gap-3">
                                {following.length > 0 ? (
                                    following.map(({ idFollowUser, username, name, profilePicture }) => (
                                        <SocialFollowCard
                                            key={idFollowUser}
                                            initialIsFollowing={true}
                                            userName={username}
                                            name={name}
                                            profile={profilePicture}
                                            updateLists={updateLists}
                                        />
                                    ))
                                ) : (
                                    <p className="text-xs">No hay usuarios para mostrar</p>
                                )}
                            </section>
                        </div>
                    </aside>
                )}

                <main className={`container ${isMobile ? "col-span-9" : "col-span-5"} bg-white/40 p-6 rounded-lg shadow-md overflow-y-auto h-screen self-start`}>

                    {isMobile && (
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="w-full p-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <span className="absolute left-3 top-2 text-gray-400">🔍</span>
                        </div>
                    )}

                    <section className="relative">
                        <div className="flex gap-4">
                            <button
                                onClick={openModal}
                                className="bg-green-400 text-white text-sm px-3 py-2 rounded-md shadow-md hover:bg-green-600">
                                📖 New Post
                            </button>
                        </div>
                    </section>

                    <section className="container mx-auto p-4">
                        {posts.map((post) => (
                            <PostBase key={post.id} username={post.username} imageUrl={post.imageUrl} description={post.description} imageProfile={post.imageProfile} idPost={post.id} usernameUser={user.username} />
                        ))}
                    </section>
                </main>

                {!isMobile && (
                    <aside className="col-span-2 p-4 rounded-lg shadow-md bg-white/40 self-start sticky top-0">
                        <h2 className="text-center font-bold text-sm pb-2">Posibles Personas que conoces</h2>
                        <hr />
                        <section className="pt-4 flex flex-col gap-3">
                            {notFollowedUsers.length > 0 ? (
                                notFollowedUsers.slice(0, 10).map(({ idFollowUser, username, name, profilePicture }) => (
                                    <SocialFollowCard
                                        key={idFollowUser}
                                        initialIsFollowing={false}
                                        userName={username}
                                        name={name}
                                        profile={profilePicture}
                                        updateLists={updateLists}
                                    />
                                ))
                            ) : (
                                <p>No hay usuarios para mostrar</p>
                            )}
                        </section>
                    </aside>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
                        <NewPost closeModal={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
