import React from 'react';
import {
  Route,
 } from 'react-router-dom';

const cache = {};

const StaticRoutes = () => {
  return [...Array(99)].map(
    ($, index) => (
      <Route 
        path={`/examples/${index}`}  
        render={() => {
          // you have to expose the path when using dynamic import, that may be the issue of webpack
          if (!cache[`../examples/example${index}/index`]) {
            const Component = React.lazy(() => import(`../examples/example${index}/index`)); 
            cache[`../examples/example${index}/index`] = <Component />
          }
          
          return cache[`../examples/example${index}/index`];
        }} 
      />
    )
  );
}

export default StaticRoutes;