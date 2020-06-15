import React from 'react';
import {
  Route,
 } from 'react-router-dom';


export default () =>
  <Route 
      exac 
      path={`/examples/subapps/2`}
      children={<div>hello sub app2</div>}
    />
