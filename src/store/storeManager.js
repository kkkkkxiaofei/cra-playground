import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import appReducer from '../reducer';
import logger from '../middlewares/logger';
import reporter from '../middlewares/reporter';

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
    store = createStore(
      appReducer, 
      compose(
        applyMiddleware(reporter, logger),  
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ name: `cra-playground` }) : f => f
      )
    );
  }
  return store;
};
