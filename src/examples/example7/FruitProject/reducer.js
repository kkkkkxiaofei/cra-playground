import { combineReducers } from 'redux';

const initState = {
  subApp: new Date()
};

export const subAppReducer1 = (state = initState, action) => {
  if (action.type === 'TEST') {
    return {
      ...state,
      data: new Date()
    }
  }
  return state;
};

export default combineReducers({
  subApp1: subAppReducer1
})