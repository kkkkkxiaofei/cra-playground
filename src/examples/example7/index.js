import React from 'react';
import { Link } from 'react-router-dom';

const Container = () => {
  return (
    <div>
      <div>
        <Link to={'/examples/subapps/1'}>subapp1</Link>
      </div>
      <div>
        <Link to={'/examples/subapps/2'}>subapp2</Link>
      </div>
    </div>
  )
}

export default Container;