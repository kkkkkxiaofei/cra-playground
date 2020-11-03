import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import { createStore, combineReducers, compose, applyMiddleware } from '../real-libs';
// import { createStore, combineReducers, compose, applyMiddleware } from '../libs';

// import { createStore, combineReducers, compose, applyMiddleware } from '@dummmy/redux';

import appReducer from '../reducer';
import logger from '../middlewares/logger';
import reporter from '../middlewares/reporter';
import thunk from '../middlewares/thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

let store = null;

export const inject = ({ key, reducer }) => {
  const reducers = combineReducers({
    appReducer,
    [key]: reducer
  });
  getStore().replaceReducer(reducers);
}


export const getStore = () => {
  if (!store) {
    const sagaMiddleware = createSagaMiddleware();

    store = createStore(
      appReducer,
      {}, 
      compose(
        applyMiddleware(thunk, reporter, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ name: `cra-playground` }) : f => f
      )
    );

    // sagaMiddleware.run(rootSaga);

    // const finalCreateStore = compose(
    //   applyMiddleware(reporter, logger),  
    //   window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ name: `cra-playground` }) : f => f
    // )(createStore);
    // store = finalCreateStore(
    //   appReducer,
    //   {}
    // );
  }
  return store;
};
