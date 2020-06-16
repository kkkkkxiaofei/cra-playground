import React from 'react';
import { Link } from 'react-router-dom';
import FruitRoutes from './FruitProject/routes';
import SchoolRoutes from './SchoolProject/routes';

const Container = () => {
  return (
    <div>
      <div>
        <Link to={'/examples/7/subapps/1'}>subapp1</Link>
      </div>
      <div>
        <Link to={'/examples/7/subapps/2'}>subapp2</Link>
      </div>
      <FruitRoutes />
      <SchoolRoutes />
    </div>
  )
}

export default Container;