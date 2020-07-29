const thunk = store => next => action => {
  console.log('---thunk middleware---');
  if (typeof action === 'function') {
    return action(store.getState(), store.dispatch);
  }
  return next(action);
}

export default thunk;