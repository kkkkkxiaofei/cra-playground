import React, { useRef, useEffect, useState } from 'react';
import styles from './VideoPlayer.module.scss';

const VideoPlayer = ({ src, caption, render }) => {
  console.log(caption)
  const videoRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const handleOnPlay = () => {
      if (!videoRef.current.ended && videoRef.current.played.length > 0) {
        // onPlay(videoRef.current.currentTime);
        setCurrentTime(videoRef.current.currentTime);
      } else {
        // window.cancelAnimationFrame(handleOnPlay);
      }
      window.requestAnimationFrame(handleOnPlay);
    };
    window.handleOnPlay = window.handleOnPlay || handleOnPlay;
    window.requestAnimationFrame(handleOnPlay);

    return window.cancelAnimationFrame(handleOnPlay);
  }, []);
  return (
    <div>
      <div className={styles.videoWrapper}>
        <video ref={videoRef} controls src={src} style={{ width: '100%', height: '100%' }}>
          <track default kind="captions"
              srclang="zh"
              label="Chinese"
              src={caption}/>
        </video>
      </div>
      {render(currentTime)}
    </div>
  )
}

export default VideoPlayer;