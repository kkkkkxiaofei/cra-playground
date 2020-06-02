import React, { useEffect, useState, useRef, useMemo, useReducer, useCallback, useLayoutEffect } from 'react';
import SideBar from './SideBar/SideBar';
import CodeEditorsContainer from './CodeEditorsContainer/CodeEditorsContainer';
import styles from './index.module.scss';
import { elementResize } from '../utils';
import { iframeContent, navs, editorConfigs } from './config';
import channel from './channel';
import useEditorsReducer from './useEditorsReducer';

const ReactPlayground = () => {
  const iframeRef = useRef(),
    hSplitterRef = useRef(),
    sideBarSplitterRef = useRef(),
    consoleSplitterRef = useRef();

  const [compiledOutput, setcompiledOutput] = useState({
    output: null,
    error: null,
  });
  const [hSplitterOffset, setHsplitterOffset] = useState(0);
  const [sideBarSplitterOffset, setSideBarSplitterOffset] = useState(0);
  const [consoleSplitterOffset, setConsoleSplitterOffset] = useState(0);
  const [sideBarNavs, setSideBarNavs] = useState(navs);//todo
  const [activedKey, setActivedKey] = useState('script.js');
  const [editors, actions] = useEditorsReducer(editorConfigs)

  const hLayout = useMemo(() => {
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

  const vLayout = useMemo(() => {
    const consoleWrapHeight = 150 - consoleSplitterOffset;
    return {
      consoleWrap: {
        height: consoleWrapHeight
      },
      codeWrap: {
        height: `calc(100% - 5px - ${consoleWrapHeight}px)` 
      }
    }
  }, [consoleSplitterOffset]);

  useEffect(() => {
    const receiver = event => {
      const { 
        to, message: { compiledCodes, compiledStyles, error } 
      } = event.data;
      if (to === 'browser') {
        setcompiledOutput({
          output: iframeContent
            .replace('/* style */', compiledStyles)
            .replace('/* code */', compiledCodes),
          error
        })
      }
    }
    channel.addListener(receiver);
    const hSplitterUninstaller = elementResize(hSplitterRef.current, setHsplitterOffset);
    const sideBarSplitterUninstaller = elementResize(sideBarSplitterRef.current, setSideBarSplitterOffset);
    const consoleSplitterUninstaller = elementResize(consoleSplitterRef.current, setConsoleSplitterOffset, 'v');
    channel.postMessage({ to: 'sw', message: editors });
    return () => {
      channel.removeListener();
      hSplitterUninstaller();
      sideBarSplitterUninstaller();
      consoleSplitterUninstaller();
    };
  }, []);

  useEffect(() => {
    if (channel.isReady()) {
      channel.postMessage({ to: 'sw', message: editors });
    }
  }, [editors]);

  return (
    <div className={styles.playground}>
      <div className={styles.sideBarWrap} style={hLayout['sideBarWrap']}>
        <SideBar 
          title={'React Playground'}
          navs={sideBarNavs}
          activedKey={activedKey}
          onSelect={setActivedKey}
        />
      </div>
      <div ref={sideBarSplitterRef} className={styles.sideBarSplitter}></div>
      <div className={styles.editorWrap} style={hLayout['editorWrap']}>
        <div className={styles.codeWrap} style={vLayout['codeWrap']}>
          <CodeEditorsContainer 
            editors={editors}
            activedKey={activedKey}
            onSelect={setActivedKey}
            updateEditor={actions.update}
          />
        </div>
        <div ref={consoleSplitterRef} className={styles.consoleSplitter}></div>
        <div className={styles.consoleWrap} style={vLayout['consoleWrap']}>
          <div className={styles.title}>Console</div>
          <div className={styles.body}>
            <pre>{compiledOutput.error}</pre>
          </div>
        </div>
      </div>
      <div ref={hSplitterRef} className={styles.hSplitter}></div>
      <div className={styles.resultWrap} style={hLayout['resultWrap']}>
        <iframe ref={iframeRef} srcDoc={compiledOutput.output} />
      </div>
    </div>
  );
};

export default ReactPlayground;