import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import StaticRoutes from './routes/StaticRoutes';
import { getStore } from './store/storeManager';

function App() {
  return (
    <Provider store={getStore()}>
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
