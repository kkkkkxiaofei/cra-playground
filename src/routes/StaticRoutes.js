import React from 'react';
import {
  Route,
 } from 'react-router-dom';

const StaticRoutes = () => {
  return [...Array(99)].map(
    ($, index) => (
      <Route 
        exac 
        path={`/examples/${index}`}  
        render={() => { const Component = React.lazy(() => import(`../examples/example${index}/index`)); return <Component />; }} 
      />
    )
  );
}

export default StaticRoutes;