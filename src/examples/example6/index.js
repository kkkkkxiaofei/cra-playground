import React, { useState } from 'react';
import Render from './render/render';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => { setCount(count + 1); }} count={count}>click me</button>
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

  return { 
    $$typeof: Symbol.for('react.element'), 
    type: 'button', 
    ref: null,
    props: { 
      children: 'click me to render',
      onClick: () => start()
    }
  }
}

export default CustomRenderExample;