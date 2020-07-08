import React from 'react';
import { Provider } from '@dummmy/react-redux';
import { createStore } from '@dummmy/redux';
import appReducer from './reducer';
import App from './App';

const store = createStore(
  appReducer,
  {},
  // compose(
  //   window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ name: `example9` }) : f => f
  // )
);

function SubApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default SubApp;