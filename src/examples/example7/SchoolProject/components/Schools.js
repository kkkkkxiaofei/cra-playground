import React from 'react';
import { useRouteMatch, Route, Link } from 'react-router-dom';
import School from './School';

const Schools = () => {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <h3>Below are all schools:</h3>
      <div>
        <Link to={`${url}/grade-school`}>grade school</Link>
      </div>
      <div>
      <Link to={`${url}/high-school`}>high school</Link>
      </div>
      <Route path={`${path}/:name`}>
        <School />
      </Route>
    </div>
  )
}

export default Schools;