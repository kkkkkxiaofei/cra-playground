import React, { useState } from 'react';
import Render from './render/render';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => { setCount(count + 1); }}>click me</button>
      <span>{count}</span>
    </div>
  );;
};

const CustomRenderExample = () => {
  const start = () => {
    const root = document.getElementById('root');
    const newRoot = document.createElement('div')
    root.replaceWith(newRoot);
    Render.render(<Counter />, newRoot);
  }

  return <button onClick={() => start()}>click me to render</button>
}

export default CustomRenderExample;