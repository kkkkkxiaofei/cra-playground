import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import './App.css';
import appReducer from './reducer';
import { BrowserRouter } from 'react-router-dom';
import StaticRoutes from './routes/StaticRoutes';

const store = createStore(
  appReducer, 
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Suspense fallback={(<div>loading...</div>)}>
            <StaticRoutes />
          </Suspense>
        </BrowserRouter>
      </div>

    </Provider>
  );
}

export default App;
