import React from 'react';
import { Link, Route } from 'react-router-dom';
import FruitProject from './FruitProject';
import SchoolProject from './SchoolProject';

const SubAppContainer = () => {
  return (
    <div>
      <div>
        <Link to={'/examples/7/subapps/fruit-project'}>FruitProject</Link>
      </div>
      <div>
        <Link to={'/examples/7/subapps/school-project'}>SchoolProject</Link>
      </div>
      <Route path={'/examples/7/subapps/fruit-project'} component={FruitProject} />
      <Route path={'/examples/7/subapps/school-project'} component={SchoolProject} />
    </div>
  )
}

export default SubAppContainer;