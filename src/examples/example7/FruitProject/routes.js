import React from 'react';
import {
  Route,
 } from 'react-router-dom';
import Apple from './components/Apple';

export default () => {
  return (
    <Route
      path={`/examples/subapps/1`}
      children={<Apple />}
    />
  )
}
