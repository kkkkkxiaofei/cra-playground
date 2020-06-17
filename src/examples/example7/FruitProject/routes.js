import React from 'react';
import {
  Route,
 } from 'react-router-dom';
import Fruits from './components/Fruits';

export default ({ prefix = '' }) => (
  <Route path={`${prefix}/fruits`} component={Fruits} />
);