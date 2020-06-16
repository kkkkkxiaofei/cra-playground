import React from 'react';
import { useParams } from 'react-router-dom';

const School = () => {
  const { name } = useParams();

  return (
    <div>
      this is {name} in subapp2
    </div>
  )
}

export default School;