import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import subAppReducer from './reducer';
import {
  BrowserRouter, Switch, Link, useRouteMatch, Route
 } from 'react-router-dom';
import Fruits from './components/Fruits';

const store = createStore(
  subAppReducer,
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ name: 'FruitProject' }) : f => f)
);

function SubApp() {
  const { url, path } = useRouteMatch();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Link to={`${url}/fruits`}>
          Go to fruit project
        </Link>
        <Route path={`${path}/fruits`} component={Fruits} />
      </BrowserRouter>
    </Provider>
  );
}

export default SubApp;