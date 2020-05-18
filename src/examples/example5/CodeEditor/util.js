export const debounce = (fn, wait) => {
  let timeout;
  return (...args) => {
    const self = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(self, args);
    }, wait);
  }
};