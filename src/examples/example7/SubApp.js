import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import subAppReducer from './reducer';
import { routes } from './routes';
import {
  BrowserRouter,
 } from 'react-router-dom';

const store = createStore(
  subAppReducer, 
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
);

function SubApp() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {
          routes.map(Route => (<Route />))
        }
      </BrowserRouter>
      <div>
        this is subApp
      </div>
    </Provider>
  );
}

export default SubApp;
