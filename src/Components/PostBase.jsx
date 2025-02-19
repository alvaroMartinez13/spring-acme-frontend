import '../Styles/post.css';
import { getLikes, addLike, removeLike, getUserByLike } from "../Services/LikeService";
import {countCommentsByPost} from '../Services/CommentService';
import { useState, useEffect } from "react";

const PostBase = ({ username, imageUrl, description, imageProfile, idPost, usernameUser }) => {
    const [numberLike, setNumberLike] = useState(0);
    const [commentLike, setCommentLike] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const fetchs = async () => {
        try {

            if (await getUserByLike(idPost, usernameUser)) {
                setIsLiked(true);
            }

            const comments = await countCommentsByPost(idPost);
            const likes = await getLikes(idPost);
            setNumberLike(likes);
            setCommentLike(comments);
        } catch (error) {
            console.error("Error al obtener likes:", error);
        }
    };

    useEffect(() => {
        fetchs();
    }, []);

    const handleLike = async () => {
        try {
            if (isLiked) {
                if (await removeLike(idPost, usernameUser))
                    setNumberLike((prev) => Math.max(0, prev - 1));
            } else {
                if (await addLike(idPost, usernameUser))
                    setNumberLike((prev) => prev + 1);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error al actualizar like:", error);
        }
    };

    return (
        <div id='container' className="bg-gray-100 flex items-center justify-center w-full mb-4 rounded-md">
            <div id='back-dark' className="bg-white p-6 rounded-lg border border-gray-300 w-full max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <img
                            src={imageProfile}
                            alt="User Avatar"
                            className="w-12 h-12 rounded-full object-cover border-2 border-black"
                        />
                        <div>
                            <p className="text-gray-800 font-semibold text-lg">{username}</p>
                            <p className="text-gray-500 text-sm">Posted 2 hours ago</p>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-gray-800">{description}</p>
                </div>

                {imageUrl && (
                    <div className="mb-4">
                        <img
                            src={imageUrl}
                            alt="Post Image"
                            className="w-full h-50 object-cover rounded-md border-2 border-teal-200"
                        />
                    </div>
                )}

                <div className="flex items-center justify-between text-gray-500">
                    <button
                        className="flex items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
                        onClick={handleLike}
                    >
                        {isLiked ? "❤️" : "🤍"} <span>{numberLike} Likes</span>
                    </button>
                    <button id='buttonComment' className="flex items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                        💬 <span>{commentLike} Comments</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostBase;
