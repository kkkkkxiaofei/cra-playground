import React from 'react';
import { useParams } from 'react-router-dom';

const Fruit = () => {
  const { name } = useParams();

  return (
    <div>
      this is {name} from subapp1
    </div>
  )
}

export default Fruit;