import React from 'react';
import {
  Route,
 } from 'react-router-dom';
import Fruits from './components/Fruits';

export default () => (
  <Route path={`/examples/7/subapps/1`}>
    <Fruits />
  </Route>
);