const reporter = store => next => action => {
  console.log('---reporter middleware---');
  return next(action);
};

export default reporter;