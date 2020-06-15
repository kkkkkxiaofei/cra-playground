import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import subAppReducer from './reducer';

const store = createStore(
  subAppReducer, 
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
);

function SubApp() {
  return (
    <Provider store={store}>
      <div>
        this is subApp
      </div>
    </Provider>
  );
}

export default SubApp;
