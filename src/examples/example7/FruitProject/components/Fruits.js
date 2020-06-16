import React, { useEffect } from 'react';
import { useRouteMatch, Route, Link } from 'react-router-dom';
import Fruit from './Fruit';
import { subAppReducer1 } from '../reducer';
import { inject } from '../../../../store/storeManager';

const Fruits = () => {
  const { path, url } = useRouteMatch();
  useEffect(() => {
    inject({ key: 'sub1', reducer: subAppReducer1 });
  }, []);
  return (
    <div>
      <h3>Below are all fruits:</h3>
      <div>
        <Link to={`${url}/apple`}>apple</Link>
      </div>
      <div>
        <Link to={`${url}/orange`}>orange</Link>
      </div>
      <Route path={`${path}/:name`}>
        <Fruit />
      </Route>
    </div>
  )
}

export default Fruits;