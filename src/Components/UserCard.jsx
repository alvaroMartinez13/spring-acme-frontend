
const UserCard = ({ user }) => {
    return (
        <div className="flex items-center bg-white border border-gray-300 rounded-lg p-4 mb-2">
            <img
                src={user.profilePicture}
                alt={user.username}
                className="w-12 h-12 rounded-full mr-4"
            />
            <div>
                <p className="text-sm font-semibold">{user.username}</p>
                <p className="text-xs text-gray-600">{user.name}</p>
            </div>
        </div>
    );
};

export default UserCard;
