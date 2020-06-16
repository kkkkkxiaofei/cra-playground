import React from 'react';
import { useRouteMatch, Route, Link } from 'react-router-dom';
import School from './School';

const Fruits = () => {
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
      <Route path={`${path}/:name`} children={<School />} />
    </div>
  )
}

export default Fruits;