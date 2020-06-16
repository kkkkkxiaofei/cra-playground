import { combineReducers } from 'redux';

export const subAppReducer2 = (state = { subApp: {}}, action) => {
  if (action.type === 'TEST') {
    return {
      ...state,
      data: new Date()
    }
  }
  return state;
};

export default combineReducers({
  subApp2: subAppReducer2
})