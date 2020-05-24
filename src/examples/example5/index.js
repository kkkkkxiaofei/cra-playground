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

  const [doc, setDoc] = useState();
  const [hSplitterOffset, setHsplitterOffset] = useState(0);
  const [sideBarSplitterOffset, setSideBarSplitterOffset] = useState(0);
  const [sideBarNavs, setSideBarNavs] = useState(navs);//todo
  const [activedKey, setActivedKey] = useState('script.js');
  const [editors, setEditors] = useState(editorConfigs);

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
      const { compiledCodes, compiledStyles } = event.data;
      setDoc(iframeContent
        .replace('/* style */', compiledStyles)
        .replace('/* code */', compiledCodes)
      );
    };

    channel = new BroadcastChannel('sw-messages');
    channel.addEventListener('message', receiver, false);

    const hSplitterUninstaller = elementResize(hSplitterRef.current, offsetX => setHsplitterOffset(offsetX));
    const sideBarSplitterUninstaller = elementResize(sideBarSplitterRef.current, offsetX => setSideBarSplitterOffset(offsetX));

    return () => {
      channel.removeEventListener('message', receiver);
      hSplitterUninstaller();
      sideBarSplitterUninstaller();
    };
  }, []);

  useEffect(() => {
    console.log('watch editors', channel)
    if (channel) {
      
      channel.postMessage(editors)
    }
  }, [editors]);

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
          editors={editors}
          activedKey={activedKey}
          onSelect={setActivedKey}
          setEditors={setEditors}
        />
      </div>
      <div ref={hSplitterRef} className={styles.hSplitter}></div>
      <div className={styles.resultWrap} style={layout['resultWrap']}>
        <iframe ref={iframeRef} srcDoc={doc} />
      </div>
    </div>
  );
};

export default ReactPlayground;