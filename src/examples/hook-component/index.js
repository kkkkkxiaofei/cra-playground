import React, {useState} from 'react';
import usePrevious from '../hooks/usePrevious';

const HookComponent = () => {
  const [val, setVal] = useState(0);
  const preVal = usePrevious(val);
  return (
    <div onClick={() => setVal(val + 1)}>{`Now: ${val}, Previous: ${preVal}`}</div>
  );
};

export default HookComponent;