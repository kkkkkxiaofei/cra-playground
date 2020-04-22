import React, { useState, useEffect, memo } from 'react';
import styles from './Bullet.module.scss';

const DURATION = 5000;

const Bullet = ({ content, duration = DURATION, color, fontSize, translateY }) => {
    const [progress, setProgress] = useState({
        timestamp: new Date().getTime(),
        percent: 0
    });
    useEffect(() => {                               
        const move = () => {
            const { timestamp } = progress;
            const newTimestamp = new Date().getTime();
            const diff = newTimestamp - timestamp;
            if (diff < duration) {
                setProgress({ timestamp: newTimestamp, percent: (diff / duration) * 100 })
                window.requestAnimationFrame(move);
            } else    {
                setProgress({ timestamp: newTimestamp, percent: 100 });
            }
        }
        window.requestAnimationFrame(move);

        return () => window.cancelAnimationFrame(move);
    }, []);

    const isBulletEnd = false && progress.percent >= 100;
    const style = {
        transform: `translate(-${progress.percent}%, ${translateY})`,
        color,
        fontSize
    }
    return !isBulletEnd && (
        <div className={styles.bulletBlock} style={style}>
            {content}
        </div>
    )
}

export default memo(Bullet);