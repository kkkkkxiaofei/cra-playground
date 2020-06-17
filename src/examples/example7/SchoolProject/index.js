import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import subAppReducer from './reducer';
import {
  BrowserRouter, Route, Link, useRouteMatch
 } from 'react-router-dom';
import Schools from './components/Schools';

const store = createStore(
  subAppReducer,
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ name: 'SchoolProject' }) : f => f)
);

function SubApp() {
  const { url, path } = useRouteMatch();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Link to={`${url}/schools`}>
          Go to school project
        </Link>
        <Route path={`${path}/schools`} component={Schools} />
      </BrowserRouter>
    </Provider>
  );
}

export default SubApp;