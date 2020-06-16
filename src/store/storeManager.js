import { createStore, combineReducers, compose } from 'redux';
import appReducer from '../reducer';

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
      compose(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
    );
  }
  return store;
};
