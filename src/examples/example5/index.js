import React, { useEffect, useState } from 'react';
// import styles from './ReactEditor.module.scss';

const ReactEditor = props => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    const receiver = event => {
      setMessage(event.data.message);
    }
    const channel = new BroadcastChannel('sw-messages');
    channel.addEventListener('message', receiver, false);

    return () => channel.removeEventListener('message', receiver);
  }, [])
  return (
    <div>
      react editor: {message}
    </div>
  );
};

export default ReactEditor;