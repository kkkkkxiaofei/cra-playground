import React, { useEffect, useState, useRef, useMemo } from 'react';
import CodeEditor from './CodeEditor/CodeEditor';
import styles from './index.module.scss';

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
  const iframeRef = useRef();
  const hSplitterRef = useRef();

  const [code, setCode] = useState(initCode);
  const [style, setStyle] = useState(initStyle);
  const [splitterPosition, setSplitterPosition] = useState({
    h: -1,
    v: -1,
  });
  
  const layout = useMemo(() => {
    const { h } = splitterPosition;
    if (h > 0) {
      return {
        editorWrap: { 
          width: `${h}px` 
        },
        hSplitter: { 
          left: `${h}px`
        },
        resultWrap: { 
          width: `calc(100% - 10px - ${h}px)`,
          left: `${h + 10}px`,
        }
      };
    } else {

    }
    return {
      editorWrap: {},
      resultWrap: {},
    };
  }, [splitterPosition]);

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

    const resize = e => {
      console.log(e);
      setSplitterPosition({ h: e.clientX })
    };

    const stopResize = () => {
      window.document.removeEventListener('mousemove', resize, false);
      window.document.removeEventListener('mouseup', stopResize, false);
    };

    const resizeInit = () => {
      window.document.addEventListener('mousemove', resize, false);
      window.document.addEventListener('mouseup', stopResize, false);
    };

    hSplitterRef.current.addEventListener('mousedown', resizeInit, false);

    return () => {
      channel.removeEventListener('message', receiver);
      hSplitterRef.current.removeEventListener('mousedown', resizeInit, false);
    };
  }, []);

  const doc = useMemo(() => {
      return iframContent.replace('/* style */', style).replace('/* code */', code);
  }, [code, style]);
  const codeOnChange = code => channel.postMessage({ type: 'code', text: code });
  const styleOnChange = style => channel.postMessage({ type: 'style', text: style });

  return (
    <div className={styles.playground}>
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
      <div ref={hSplitterRef} className={styles.hSplitter} style={layout['hSplitter']}></div>
      <div className={styles.resultWrap} style={layout['resultWrap']}>
        <iframe ref={iframeRef} srcDoc={doc} />
      </div>
    </div>
  );
};

export default ReactPlayground;