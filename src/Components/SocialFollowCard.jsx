import '../Styles/SocialFollowCard.css';
import { useState, useContext } from 'react';
import { followUser, unfollowUser } from '../Services/FollowService';
import { AuthContext } from '../Context/AuthContext';

export default function SocialFollowCard({ userName, name, initialIsFollowing, profile, updateLists }) {
    const { user } = useContext(AuthContext);
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

    const handleClick = async () => {
        try {
            if (isFollowing) {
                await unfollowUser(userName);
            } else {
                await followUser(userName);
            }
            setIsFollowing(!isFollowing);
            updateLists(); // Actualizar listas en HomePage
        } catch (error) {
            console.error("Error al actualizar seguimiento:", error);
        }
    };

    const following = isFollowing ? 'Siguiendo' : 'Seguir';
    const buttonClassName = isFollowing
        ? 'tw-followCard-button is-following'
        : 'tw-followCard-button';

    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img className='w-10 h-10 rounded-full object-cover' src={profile} alt="Avatar" />
                <div className='tw-followCard-info'>
                    <strong>{name}</strong>
                    <span className='tw-followCard-infoUserName'>@{userName}</span>
                </div>
            </header>

            <aside id='follow'>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className={`tw-followCard-text ${isFollowing ? '' : 'hidden'}`}>
                        {following}
                    </span>
                    <span className={`tw-followCard-stopFollow ${isFollowing ? 'block' : 'hidden'}`}>
                        Dejar de seguir
                    </span>
                </button>
            </aside>
        </article>
    );
}
