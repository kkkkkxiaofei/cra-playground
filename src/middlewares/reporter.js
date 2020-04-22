const logger = store => next => action => {
  console.log('---suspense start---');
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.log('---suspense end---');
  return result;
};

export default logger;