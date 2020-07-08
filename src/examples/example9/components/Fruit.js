import React from 'react';
import { useDispatch } from '@dummmy/react-redux';

const Fruit = props => {
  const { id, price } = props;
  const dispatch = useDispatch();

  return (
    <div>
      <p>{`the price of fruit ${id} is ${price}`}</p>
      <button onClick={() => dispatch({ type: 'CHANGE_PRICE', id, price: price + 1 })}>add price</button>
    </div>
  )
}

export default Fruit;