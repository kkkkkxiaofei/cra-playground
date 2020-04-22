import React, { useState } from 'react';
import CoolVideoPlayer from './CoolVideoPlayer/CoolVideoPlayer';
import styles from './index.module.scss';

const random = (left, right) => left + Math.random() * (right - left);
  
const gernateBulltes = (size = 5) => [...Array(size)].map(($, index) => ({ 
  id: `${index}`,
  content: `bullet${index}`,
  displayTime: random(1,500),
  duration: random(5000, 15000),
  color: ['white', 'green', 'red'][Math.floor(Math.random() * 10) % 3],
  fontSize: ['18px', '28px', '38px'][Math.floor(Math.random() * 10) % 3],
  translateY: `${Math.abs(Math.random() * 1000 / 2 - 100)}px`
}))

const resources = [
  {
    src: 'http://mov.bn.netease.com/mobilev/2012/12/8/A/S8H4PQP8A.mp4',
    caption: '/justice1.vtt',
    title: '谋杀背后的道德逻辑'
  },
  {
    src: 'http://mov.bn.netease.com/mobilev/2012/12/C/6/S8H4U16C6.mp4',
    caption: '/justice2.vtt',
    title: '为生命标价'
  },
  {
    src: 'http://mov.bn.netease.com/mobilev/2012/12/G/I/S8H4VMUGI.mp4',
    caption: '/justice3.vtt',
    title: '自由的选择'
  },
  {
    src: 'http://mov.bn.netease.com/mobilev/2012/12/8/2/S8H52FA82.mp4',
    caption: '/justice4.vtt',
    title: '这是我的土地'
  },
  {
    src: 'http://mov.bn.netease.com/mobilev/2012/12/7/M/S8H53HK7M.mp4',
    caption: '/justice5.vtt',
    title: '是否雇佣顶替自己服役的人'
  },
  {
    src: 'http://mov.bn.netease.com/mobilev/2012/12/E/M/S8H53JCEM.mp4',
    caption: '/justice6.vtt',
    title: '小心你的动机'
  },
  {
    src: 'http://mov.bn.netease.com/mobilev/2012/12/J/B/S8H7CFIJB.mp4',
    caption: '/justice7.vtt',
    title: '谎言的教训'
  },
  {
    src: 'http://mov.bn.netease.com/mobilev/2012/12/5/N/S8H7FHH5N.mp4',
    caption: '/justice8.vtt',
    title: '公平的起点是什么'
  },
  {
    src: 'http://mov.bn.netease.com/mobilev/2012/12/2/N/S8H7H5D2N.mp4',
    caption: '/justice9.vtt',
    title: '平权行动的争论'
  },
  {
    src: 'http://mov.bn.netease.com/mobilev/2012/12/C/V/S8H7JBDCV.mp4',
    caption: '/justice9.vtt',
    title: '好公民'
  },
  {
    src: 'http://mov.bn.netease.com/mobilev/2012/12/9/B/S8H7K1L9B.mp4',
    caption: '/justice11.vtt',
    title: '共同责任的辩论'
  },
  {
    src: 'http://mov.bn.netease.com/mobilev/2012/12/7/1/S8H7K5M71.mp4',
    caption: '/justice12.vtt',
    title: '同性婚姻的争论'
  }
]

const VideoListPage = () => {
  const [resource, setResource] = useState({...resources[0], bullets: gernateBulltes()});
  return (
    <div className={styles.videoListPage}>
      <div className={styles.palyerWrapper}> 
        <CoolVideoPlayer {...resource} />
      </div>
      <div className={styles.videoList}>
        {resources.map((resource, index) => (
          <div className={styles.placeHolder} onClick={() => setResource({...resources[index], bullets: gernateBulltes()})}>
            <div className={styles.area}>
              {resource.title}
            </div>
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default VideoListPage;