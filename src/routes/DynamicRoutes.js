import React, { useState, useEffect, lazy } from 'react';
import { routes as routesForSub1 } from '../examples/example7/routes';
import StaticRoutes from './StaticRoutes';

const subAppPath = {
  sub1: '../examples/example7/routes'
}

const DynamicRoutes = props => {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    // const Component = lazy(() => import('./StaticRoutes'));
    // setRoute(Component);
    import(`../examples/example${1+6}/routes`).then(result => {
      console.log(result.routes, 'done');
      setRoute(result.routes)
    })
  }, []);

  return route || null;
};

export default DynamicRoutes;