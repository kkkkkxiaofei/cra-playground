const wrapPromise = promise => {
  let status = 'pending';
  let result;
  
  promise.then(data => {
    status = 'resolved';
    result = data;
  })
  .catch(e => {
    status = 'rejected';
    result = e;
  });

  return {
    read: () => {
      switch(status) {
        case 'pending': throw promise;
        case 'resolved': return result;
        case 'rejected': throw result;
        default: throw result;
      }
    }
  }
}

export default wrapPromise(
  new Promise((resolve) => {
    setTimeout(() => resolve("this the response from api"), 3000);
  })
);