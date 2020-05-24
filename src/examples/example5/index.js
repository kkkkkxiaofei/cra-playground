import React, { useEffect, useState, useRef, useMemo } from 'react';
import CodeEditor from './CodeEditor/CodeEditor';
import SideBar from './SideBar/SideBar';
import styles from './index.module.scss';
import { elementResize } from '../utils';

const iframContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    /* style */
  </style>
</head>
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <script>
    /* code */
  </script>
</body>
</html>
`;

const initCode = `
const ReactEditor = props => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div className="bg">
      <button onClick={() => setVisible(!visible)}>click me</button>
      {visible && <div>react editor</div>}
    </div>
  );
};

ReactDOM.render(
  <ReactEditor />,
  document.getElementById('root')
);
`;

const initStyle = `
$color: red;

.bg {
  background-color: $color;
}
`;

const ReactPlayground = props => {
  const iframeRef = useRef(),
    hSplitterRef = useRef(),
    sideBarSplitterRef = useRef();

  const [code, setCode] = useState(initCode);
  const [style, setStyle] = useState(initStyle);
  const [hSplitterOffset, setHsplitterOffset] = useState(0);
  const [sideBarSplitterOffset, setSideBarSplitterOffset] = useState(0);
  
  const layout = useMemo(() => {
    const splitterWidth = 5 + 5;
    const sideBarWidth = 200 + sideBarSplitterOffset;
    const fixedWidth = splitterWidth + sideBarWidth;
    return {
      sideBarWrap: {
        width: `${sideBarWidth}px`
      },
      editorWrap: { 
        width: `calc(50% - ${fixedWidth / 2}px ${hSplitterOffset > 0 ? '+' : '-'} ${Math.abs(hSplitterOffset)}px)`
      },
      resultWrap: { 
        width: `calc(50% - ${fixedWidth / 2}px ${hSplitterOffset > 0 ? '-' : '+'} ${Math.abs(hSplitterOffset)}px)`
      },
    };
  }, [hSplitterOffset, sideBarSplitterOffset]);

  let channel;

  useEffect(() => {
    const receiver = event => {
      const { type, text } = event.data;
      switch (type) {
        case 'code': 
          return setCode(text);
        case 'style': 
          return setStyle(text);
      }
    };

    channel = new BroadcastChannel('sw-messages');
    channel.addEventListener('message', receiver, false);
    channel.postMessage({ type: 'code', text: code });  
    channel.postMessage({ type: 'style', text: style });

    const hSplitterUninstaller = elementResize(hSplitterRef.current, offsetX => setHsplitterOffset(offsetX));
    const sideBarSplitterUninstaller = elementResize(sideBarSplitterRef.current, offsetX => setSideBarSplitterOffset(offsetX));

    return () => {
      channel.removeEventListener('message', receiver);
      hSplitterUninstaller();
      sideBarSplitterUninstaller();
    };
  }, []);

  const doc = useMemo(() => {
      return iframContent.replace('/* style */', style).replace('/* code */', code);
  }, [code, style]);
  const codeOnChange = code => channel.postMessage({ type: 'code', text: code });
  const styleOnChange = style => channel.postMessage({ type: 'style', text: style });

  return (
    <div className={styles.playground}>
      <div className={styles.sideBarWrap} style={layout['sideBarWrap']}>
        <SideBar 
          title={'React Playground'}
          navs={[
            {
              cate: 'JS',
              files: [
                'index.js',
                'scripts.js'
              ]
            },
            {
              cate: 'Scss',
              files: [
                'style.scss'
              ]
            },
          ]}
          onSelect={null}
        />
      </div>
      <div ref={sideBarSplitterRef} className={styles.sideBarSplitter}></div>
      <div className={styles.editorWrap} style={layout['editorWrap']}>
        <div className={styles.styleWrap}>
          <CodeEditor 
            onChange={styleOnChange} 
            language={"scss"} 
            value={initStyle}
          />
        </div>
        <div className={styles.codeWrap}>
          <CodeEditor 
            onChange={codeOnChange} 
            language={"javascript"} 
            value={initCode}
          />
        </div>
      </div>
      <div ref={hSplitterRef} className={styles.hSplitter}></div>
      <div className={styles.resultWrap} style={layout['resultWrap']}>
        <iframe ref={iframeRef} srcDoc={doc} />
      </div>
    </div>
  );
};

export default ReactPlayground;