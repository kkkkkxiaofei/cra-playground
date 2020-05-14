import React, { useEffect, useState, useRef, useMemo } from 'react';
// import styles from './ReactEditor.module.scss';
const iframContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
const ReactEditor = props => {
  const iframeRef = useRef();
  const [code, setCode] = useState('');
  const [style, setStyle] = useState('');
  

  useEffect(() => {
    window.setStyle = window.setStyle || setStyle;

    const receiver = event => {
      setCode(event.data.message);
    }
    const channel = new BroadcastChannel('sw-messages');
    channel.addEventListener('message', receiver, false);

    return () => channel.removeEventListener('message', receiver);
  }, []);

  useEffect(() => {
    if (iframeRef.current) {
      const newContent = iframContent.replace('/* style */', style).replace('/* code */', code);
      console.log('.....', newContent);
      iframeRef.current.contentDocument.write(newContent);
    }
  }, [code, style]);

  const doc = useMemo(() => {
    if (iframeRef.current) {
      return iframContent.replace('/* style */', style).replace('/* code */', code);
    }
  }, [code, style]);
  return (
    <div>
      <iframe ref={iframeRef} srcDoc={doc} />
    </div>
  );
};

export default ReactEditor;