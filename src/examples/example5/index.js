import React, { useEffect, useState, useRef, useMemo } from 'react';
import CodeEditor from './CodeEditor/CodeEditor';
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

    return () => channel.removeEventListener('message', receiver);
  }, []);

  const doc = useMemo(() => {
      return iframContent.replace('/* style */', style).replace('/* code */', code);
  }, [code, style]);

  const codeOnChange = code => channel.postMessage({ type: 'sw', message: code });
  const styleOnChange = style => {
    // console.log(style.replace(' ', ''));
    setStyle(style.replace(/\s/g, ' '));
  };
  return (
    <div>
      <iframe ref={iframeRef} srcDoc={doc} />
      <CodeEditor 
        onChange={codeOnChange} 
        language={"javascript"} 
        value={initCode}
      />
      <CodeEditor 
        onChange={styleOnChange} 
        language={"css"} 
        value={initStyle}
      />
    </div>
  );
};

export default ReactPlayground;