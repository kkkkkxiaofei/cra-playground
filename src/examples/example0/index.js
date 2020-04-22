import React from 'react';
import dataFetcher from './api';

const SuspenseComponent = () => {
  const result = dataFetcher.read();
  return (<div>
    <h1>hello suspense component</h1>
    <div>{result}</div>
  </div>);
}

export default SuspenseComponent;