import React from 'react';
import {
  Route,
 } from 'react-router-dom';
import Fruits from './components/Fruits';

export default () => {
  return (
    <Route
      path={`/examples/7/subapps/1`}
      children={<Fruits />}
    />
  )
}
