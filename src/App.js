import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import './App.css';
import appReducer from './reducer';
import {
 BrowserRouter,
 Route,
} from 'react-router-dom';

import Example0 from './examples/example0';

const store = createStore(
  appReducer, 
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          {/* <Suspense fallback={(<div>loading...</div>)}>
            {
            [...Array(99)].map(
                ($, index) => (
                  <Route 
                    exac 
                    path={`/examples/${index}`}  
                    render={() => { const Component = React.lazy(() => import(`./examples/example${index}/index`)); return <Component />; }} 
                  />
                )
              )
            }
          </Suspense> */}
          <Route path={'/examples/0'} component={Example0} />
        </BrowserRouter>
      </div>

    </Provider>
  );
}

export default App;
