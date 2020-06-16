import React from 'react';
import {
  Route,
 } from 'react-router-dom';
import Schools from './components/Schools';

export default () =>
  <Route 
      exac 
      path={`/examples/7/subapps/2`}
      children={<Schools />}
    />
