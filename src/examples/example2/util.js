const random = (left, right) => left + Math.random() * (right - left);
  
const gernateBulltes = (size = 5000) => [...Array(size)].map(($, index) => ({ 
  id: `${index}`,
  content: `bullet${index}`,
  displayTime: random(1,3000),
  duration: random(5000, 15000),
  color: ['white', 'green', 'red'][Math.floor(Math.random() * 10) % 3],
  fontSize: ['18px', '28px', '38px'][Math.floor(Math.random() * 10) % 3],
  translateY: `${Math.abs(Math.random() * 1000 / 2 - 100)}px`
}))

export const resources = [
  {
    id: '0',
    src: 'http://mov.bn.netease.com/mobilev/2012/12/8/A/S8H4PQP8A.mp4',
    caption: '/example2/justice1.vtt',
    title: '谋杀背后的道德逻辑',
    bullets: gernateBulltes(),
  },
  {
    id: '1',
    src: 'http://mov.bn.netease.com/mobilev/2012/12/C/6/S8H4U16C6.mp4',
    caption: '/example2/justice2.vtt',
    title: '为生命标价',
    bullets: gernateBulltes(),
  },
  {
    id: '2',
    src: 'http://mov.bn.netease.com/mobilev/2012/12/G/I/S8H4VMUGI.mp4',
    caption: '/example2/justice3.vtt',
    title: '自由的选择',
    bullets: gernateBulltes(),
  },
  {
    id: '3',
    src: 'http://mov.bn.netease.com/mobilev/2012/12/8/2/S8H52FA82.mp4',
    caption: '/example2/justice4.vtt',
    title: '这是我的土地',
    bullets: gernateBulltes(),
  },
  {
    id: '4',
    src: 'http://mov.bn.netease.com/mobilev/2012/12/7/M/S8H53HK7M.mp4',
    caption: '/example2/justice5.vtt',
    title: '是否雇佣顶替自己服役的人',
    bullets: gernateBulltes(),
  },
  {
    id: '5',
    src: 'http://mov.bn.netease.com/mobilev/2012/12/E/M/S8H53JCEM.mp4',
    caption: '/example2/justice6.vtt',
    title: '小心你的动机',
    bullets: gernateBulltes(),
  },
  {
    id: '6',
    src: 'http://mov.bn.netease.com/mobilev/2012/12/J/B/S8H7CFIJB.mp4',
    caption: '/example2/justice7.vtt',
    title: '谎言的教训',
    bullets: gernateBulltes(),
  },
  {
    id: '7',
    src: 'http://mov.bn.netease.com/mobilev/2012/12/5/N/S8H7FHH5N.mp4',
    caption: '/example2/justice8.vtt',
    title: '公平的起点是什么',
    bullets: gernateBulltes(),
  },
  {
    id: '8',
    src: 'http://mov.bn.netease.com/mobilev/2012/12/2/N/S8H7H5D2N.mp4',
    caption: '/example2/justice9.vtt',
    title: '平权行动的争论',
    bullets: gernateBulltes(),
  },
  {
    id: '9',
    src: 'http://mov.bn.netease.com/mobilev/2012/12/C/V/S8H7JBDCV.mp4',
    caption: '/example2/justice9.vtt',
    title: '好公民',
    bullets: gernateBulltes(),
  },
  {
    id: '10',
    src: 'http://mov.bn.netease.com/mobilev/2012/12/9/B/S8H7K1L9B.mp4',
    caption: '/example2/justice11.vtt',
    title: '共同责任的辩论',
    bullets: gernateBulltes(),
  },
  {
    id: '11',
    src: 'http://mov.bn.netease.com/mobilev/2012/12/7/1/S8H7K5M71.mp4',
    caption: '/example2/justice12.vtt',
    title: '同性婚姻的争论',
    bullets: gernateBulltes(),
  }
]