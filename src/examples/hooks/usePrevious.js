import {useRef, useEffect} from 'react';

export default (val) => {
  const valRef = useRef(val);

  useEffect(() => {
    valRef.current = val
  });

  return valRef.current;
}