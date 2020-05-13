export default (...args) => {
  return args.map(arg => {
    if (typeof arg === 'object') {
      return Object.keys(arg)
              .filter(key => arg[key])
              .join(' ');
    } 
    return arg;
  }).join(' ');
};