import { useState } from "react";

const NewPost = ({ closeModal }) => { 
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [textImage, setTextImage] = useState("");
    const maxLength = 500;

    const handleChange = (event) => {
        if (event.target.value.length <= maxLength) {
            setText(event.target.value);
        }
    };

    const onCancel = () => {
        setTitle("");
        setTextImage("");
        setText("");
        closeModal();
    };

    return (
        <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
            <h2 className="font-bold pb-4">New Post</h2>

            <input
                className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                spellCheck="false"
                placeholder="Title"
                type="text"
            />

            <input
                className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                spellCheck="false"
                placeholder="Image URL"
                type="text"
            />

            <input
                className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                spellCheck="false"
                placeholder="Tag"
                type="text"
            />

            <textarea
                className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
                spellCheck="false"
                placeholder="Describe everything about this post here"
                value={text}
                onChange={handleChange}
            ></textarea>

            <div className="icons flex text-gray-500 m-2">
                <div className={`count ml-auto text-xs font-semibold ${text.length === maxLength ? 'text-red-500' : 'text-gray-400'}`}>
                    {text.length}/{maxLength}
                </div>
            </div>

            <div className="buttons flex">
                <button
                    onClick={onCancel}
                    className="border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
                >
                    Cancel
                </button>
                <div className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
                    Post
                </div>
            </div>
        </div>
    );
};

export default NewPost;
