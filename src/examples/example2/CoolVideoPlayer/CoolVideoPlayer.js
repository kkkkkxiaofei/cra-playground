import React, { useState } from 'react';
import styles from './CoolVideoPlayer.module.scss';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Bullet from '../Bullet/Bullet';

const CoolVideoPlayer = ({ src, caption, bullets }) => {
    const [visible, setVisible] = useState(false);
    //todo consider external comments update
    const [currentBullets, setCurrentBullets] = useState([]);
    const addComment = content => setCurrentBullets([...currentBullets, ({ content })]);
    const handleKeyDown = e => {
        if (e.keyCode == 13) {
            addComment(e.target.value);
        }
    }
    const onPlay = currentTime => {
        const nextBullets = bullets.filter(({ displayTime, duration }) => displayTime < currentTime && currentTime < (displayTime + duration));
        console.log(currentTime, nextBullets)
        setCurrentBullets([...currentBullets, ...nextBullets]);
    }
    return (
        <div className={styles.coolVideoBlock}>
          <VideoPlayer src={src} caption={caption} onPlay={onPlay} />
          <div className={styles.bulletBlock}>
            {
              currentBullets.map(bullet => <Bullet key={bullet.id} {...bullet} />)
            }
            <div className={styles.actionBlock}>
                <div className={styles.actionWrapper}>
                    <input onKeyDown={handleKeyDown} style={{ visibility: `${visible ? 'visible' : 'hidden'}` }} />
                    <button style={{ color: `${visible ? 'green' : 'grey'}` }} onClick={() => setVisible(!visible)}>
                        {visible ? 'on' : 'off'}
                    </button>
                </div>
            </div>
          </div>
        </div>
    )
}

export default CoolVideoPlayer;