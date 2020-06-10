import React, { useState } from 'react';

const CustomRenderExample = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => { setCount(count + 1); }}>click me</button>
      <span>{count}</span>
    </div>
  );
}

export default CustomRenderExample;