import React from 'react';
import {
  Route,
 } from 'react-router-dom';


export default () => {
  console.log('subapp1')
  return (
    <Route
      path={`/examples/subapps/1`}
      render={() => <div>hello sub app1</div>} 
    />
  )
}
