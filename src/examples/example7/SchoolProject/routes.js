import React from 'react';
import {
  Route,
 } from 'react-router-dom';
import User from './components/Student';

export default () =>
  <Route 
      exac 
      path={`/examples/subapps/2`}
      children={<User />}
    />
