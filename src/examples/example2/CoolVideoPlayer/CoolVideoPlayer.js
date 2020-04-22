import React, { useState } from 'react';
import styles from './CoolVideoPlayer.module.scss';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Bullet from '../Bullet/Bullet';

const CoolVideoPlayer = ({ src, caption, bullets }) => {
    const [visible, setVisible] = useState(false);
    //todo consider external comments update
    const [videoDescription, setVideoDescription] = useState({
        currentTime: 0,
        currentBullets: bullets
    })
    const addComment = content => {
        const { currentTime, currentBullets } = videoDescription;
        setVideoDescription({currentBullets: [...currentBullets, ({ id: `${Math.random()}`, content, displayTime: currentTime + 1 })], currentTime})
    }
    const handleKeyDown = e => {
        if (e.keyCode == 13) {
            addComment(e.target.value);
        }
    }
    
    return (
        <div className={styles.coolVideoBlock}>
          <VideoPlayer 
            src={src} 
            caption={caption} 
            render={currentTime => (
                <div className={styles.bulletBlock}>
                    <Bullet bullets={videoDescription.currentBullets} currentTime={currentTime} />
                </div>
            )}
            />
          <div className={styles.bulletBlock}>

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