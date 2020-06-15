import { combineReducers } from 'redux';

const subAppReducer = (state = { subApp: {}}, action) => {
  if (action.type === 'TEST') {
    return {
      ...state,
      data: new Date()
    }
  }
  return state;
};

export default combineReducers({
  subApp: subAppReducer
})