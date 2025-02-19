import '../Styles/SocialFollowCard.css'
import { useState } from 'react';

export default function SocialFollowCard({ userName, name, initialIsFollowing, profile }) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

    const handleClick = () => {
        setIsFollowing(!isFollowing);
    }

    const following = isFollowing ? 'Siguiendo' : 'Seguir';
    const buttonClassName = isFollowing
        ? 'tw-followCard-button is-following'
        : 'tw-followCard-button'

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
    )
}