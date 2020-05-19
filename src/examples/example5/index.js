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
.bg {
  background-color: green;
}
`;
const ReactPlayground = props => {
  const iframeRef = useRef();
  const [code, setCode] = useState(initCode);
  const [style, setStyle] = useState(initStyle);
  
  let channel;

  useEffect(() => {
    window.setStyle = window.setStyle || setStyle;

    const receiver = event => {
      setCode(event.data.message);
    }
    channel = new BroadcastChannel('sw-messages');
    channel.addEventListener('message', receiver, false);
    channel.postMessage({ type: 'sw', message: code });  
    return () => channel.removeEventListener('message', receiver);
  }, []);

  const doc = useMemo(() => {
      return iframContent.replace('/* style */', style).replace('/* code */', code);
  }, [code, style]);

  const codeOnChange = code => channel.postMessage({ type: 'sw', message: code });
  const styleOnChange = style => {
    window.Sass && window.Sass.compile(style.replace(/\s/g, ' '), result => setStyle(result.text));
  };
  return (
    <div className={styles.playground}>
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
      <div className={styles.result}>
        <iframe ref={iframeRef} srcDoc={doc} />
      </div>
    </div>
  );
};

export default ReactPlayground;