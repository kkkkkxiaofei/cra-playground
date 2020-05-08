import React, { useRef, useEffect, useState } from 'react';
import styles from './VideoPlayer.module.scss';

const getPlayStatus = videoRef => {
  const { current } = videoRef;
  const { ended, played = [], paused } = current || {};
  return !ended && played.length > 0 && !paused;
}

const VideoPlayer = ({ src, caption, render }) => {
  const videoRef = useRef();
  const [refData, setRefData] = useState({ currentTime: 0, isPlaying: false });

  useEffect(() => {
    const handleOnPlay = () => {
      if (getPlayStatus(videoRef)) {
        setRefData({ currentTime: videoRef.current.currentTime, isPlaying: true })
      }
      window.requestAnimationFrame(handleOnPlay);
    };
    window.requestAnimationFrame(handleOnPlay);

    return () => {
      setRefData(null);
    }
  }, []);

  useEffect(() => {
    setRefData({ currentTime: 0, isPlaying: false });
  }, [src]);

  return (
    <div>
      <div className={styles.videoWrapper}>
        <video ref={videoRef} controls autoPlay src={src} style={{ width: '100%', height: '100%' }}>
          <track default kind="captions"
              srclang="zh"
              label="Chinese"
              src={caption}/>
        </video>
      </div>
      {refData.isPlaying && render(refData.currentTime)}
    </div>
  )
}

export default VideoPlayer;