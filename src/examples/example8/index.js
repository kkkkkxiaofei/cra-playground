import React, { useState, useEffect, useMemo } from 'react';
import { useRouteMatch, Route, Link } from 'react-router-dom';
import { subAppPath, subAppModuleName } from './config';

const DynamicRoutes = () => {
  const [routes, setRoutes] = useState(null);
  const { path: basePath } = useRouteMatch();

  const Children = useMemo(() => {
    if (routes) {

      return routes.map(({ path, component }) => (
        <div>
          <Link to={`${basePath}${path}`}>{path}</Link>
          <Route path={`${basePath}${path}`} children={component} />
        </div>
      ))
    }
    return null;
  }, [routes]);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = subAppPath;
    const onload = event => {
      setRoutes(window[subAppModuleName].routes);
    }
    script.onload = onload;
    document.body.appendChild(script);
  }, []);
  return Children ? Children : <div>loading the routes of sub app</div>;
};

export default DynamicRoutes;