const logger = store => next => action => {
  console.log('---logger middleware---');
  return next(action)
};

export default logger;