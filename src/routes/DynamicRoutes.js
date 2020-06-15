import React, { useState, useEffect, lazy } from 'react';
import { useParams } from 'react-router-dom';

const DynamicRoutes = () => {
  const [RouteComponent, setRouteComponent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    import(`../examples/example7/routes`).then(result => {
      console.log(result.routes[`sub${id}`], 'done');
      setRouteComponent(result.routes[`sub${id}`]);
    })
  }, []);

  return RouteComponent ? RouteComponent: <div>loading routes for subapp{id}</div>;
};

export default DynamicRoutes;