import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Fruit from './components/Fruit';

const App = () => {
  const dispatch = useDispatch();
  const fruits = useSelector(state => state.app.fruits);
  return (
    <div>
      <h1 onClick={() => dispatch({ type: 'MODIFY'})}>
        App
      </h1>
      <button onClick={() => dispatch({ type: 'ADD_FRUIT', id: fruits.length + 1})}>add fruit</button>
      {fruits.map(fruit => (<Fruit {...fruit} />))}
    </div>
  )
};

export default App;