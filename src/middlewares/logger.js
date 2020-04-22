const logger = store => next => action => {
  console.log('---logger start---');
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.log('---logger end---');
  return result;
};

export default logger;