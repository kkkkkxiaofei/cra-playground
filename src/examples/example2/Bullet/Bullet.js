import React, { useState, useEffect } from 'react';
import styles from './Bullet.module.scss';

const Bullet = (props) => {
    const { bullets, currentTime } = props;
    console.log(bullets, 'bullets', currentTime);
    const calcPercent = bullet => {
        let { displayTime, duration } = bullet;
        duration = duration / 1000;
        if (displayTime <= currentTime && currentTime <= displayTime + duration) {
            const percent = ((currentTime - displayTime) / duration) * 100;
            return percent > 100 ? 100 : percent;
        }
        return 0;
    }

    return (
        <div>
            {
                bullets.filter(bullet => calcPercent(bullet) > 0).map(bullet => (
                    <div className={styles.bulletBlock} style={{ 
                        transform: `translate(-${calcPercent(bullet)}%, ${bullet.translateY})`,
                        color: bullet.color,
                        fontSize: bullet.fontSize }}
                    >
                        {bullet.content}
                    </div>
                ))
            }
        </div>
        
    );
}

export default Bullet;