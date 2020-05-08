import React, { useState } from 'react';
import classNames from 'classnames';
import CoolVideoPlayer from './CoolVideoPlayer/CoolVideoPlayer';
import styles from './index.module.scss';
import { resources } from './util';

const VideoListPage = () => {
  const [resource, setResource] = useState({ ...resources[0] });
  return (
    <div className={styles.videoListPage}>
      <div className={styles.palyerWrapper}> 
        <CoolVideoPlayer {...resource} />
      </div>
      <div className={styles.videoList}>
        {resources.map((item, index) => (
          <div className={classNames(styles.placeHolder, { [styles.actived]: index == resource.id })} onClick={() => setResource({ ...item })}>
            <div className={styles.area}>
              {item.title}
            </div>
            <div className={styles.cover}></div>
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default VideoListPage;