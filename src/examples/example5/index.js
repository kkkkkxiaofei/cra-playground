import React, { useEffect, useState, useRef, useMemo } from 'react';
import SideBar from './SideBar/SideBar';
import CodeEditorsContainer from './CodeEditorsContainer/CodeEditorsContainer';
import styles from './index.module.scss';
import { elementResize } from '../utils';
import { iframeContent, navs, editorConfigs } from './config';

const ReactPlayground = () => {
  const iframeRef = useRef(),
    hSplitterRef = useRef(),
    sideBarSplitterRef = useRef();

  const [code, setCode] = useState();
  const [style, setStyle] = useState();
  const [hSplitterOffset, setHsplitterOffset] = useState(0);
  const [sideBarSplitterOffset, setSideBarSplitterOffset] = useState(0);
  const [sideBarNavs, setSideBarNavs] = useState(navs);
  const [activedKey, setActivedKey] = useState('script.js');
  
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
      return iframeContent.replace('/* style */', style).replace('/* code */', code);
  }, [code, style]);
  const codeOnChange = code => channel.postMessage({ type: 'code', text: code });
  const styleOnChange = style => channel.postMessage({ type: 'style', text: style });

  return (
    <div className={styles.playground}>
      <div className={styles.sideBarWrap} style={layout['sideBarWrap']}>
        <SideBar 
          title={'React Playground'}
          navs={sideBarNavs}
          onSelect={null}
        />
      </div>
      <div ref={sideBarSplitterRef} className={styles.sideBarSplitter}></div>
      <div className={styles.editorWrap} style={layout['editorWrap']}>
        <CodeEditorsContainer 
          editorConfigs={editorConfigs}
          activedKey={activedKey}
          onSelect={setActivedKey}
        />
        {/* <CodeEditor 
            onChange={styleOnChange} 
            language={"scss"} 
            value={initStyle}
          /> */}
        {/* <div className={styles.styleWrap}>
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
        </div> */}
      </div>
      <div ref={hSplitterRef} className={styles.hSplitter}></div>
      <div className={styles.resultWrap} style={layout['resultWrap']}>
        <iframe ref={iframeRef} srcDoc={doc} />
      </div>
    </div>
  );
};

export default ReactPlayground;