import React from 'react';
import { useRouteMatch, Route, Link } from 'react-router-dom';
import Fruit from './Fruit';

const Fruits = () => {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <h3>Below are all fruits:</h3>
      <div>
        <Link to={`${url}/apple`}>apple</Link>
      </div>
      <div>
        <Link to={`${url}/orange`}>orange</Link>
      </div>
      <Route path={`${path}/:name`} children={<Fruit />} />
    </div>
  )
}

export default Fruits;