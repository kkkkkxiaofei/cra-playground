import { combineReducers } from 'redux';

const appReducer = (state = { app: {}}, action) => {
  if (action.type === 'TEST') {
    return {
      ...state,
      data: new Date()
    }
  }
  return state;
};

const suspenseReducer = (state = {}, action)  => {
  if (action.type === 'SUSPENSE' || action.type === 'TEST') {
    return {
      ...state,
      data: new Date()
    }
  }
  return state;
}

export default combineReducers({
  app: appReducer,
  suspense: suspenseReducer
})