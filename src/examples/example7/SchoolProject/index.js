import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import subAppReducer from './reducer';
import {
  BrowserRouter
 } from 'react-router-dom';
import Route from './routes';

const store = createStore(
  subAppReducer,
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ name: 'SchoolProject' }) : f => f)
);

function SubApp() {
  return (
    <Provider store={store}>
      <div>
        this is subApp2
      </div>
      <BrowserRouter>
        <Route />
      </BrowserRouter>
    </Provider>
  );
}

export default SubApp;