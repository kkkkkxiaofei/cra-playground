function MyPromise(fn) {
  const INIT = -1;
  const PENDING = 0;
  const FULLFILLED = 1;
  const REJECTED = 2;

  let result = null;
  let state = INIT;

  let callbacks = [];

  this.then = function(callback) {
     if (state === FULLFILLED) {
       return MyPromise(function(resolve) {
        resolve(callback(result));
       })
     } else {
       callbacks.push(callback);
     }
  }

  function handleCallbacks() {
    while(callbacks.length) {
      callbacks.shift()(result)
    }
  }

  function onResolve(value) {
    result = value;
    state = FULLFILLED;
    handleCallbacks();
  }

  (function() {
    state = PENDING;  
    fn(onResolve);  
  })()
  
}



export default () => {
  var p1 = new MyPromise(function(resolve) {
    setTimeout(function() {
      resolve('value1');
    }, 1000);
  });
  
  var p2 = p1.then(result => console.log("Then of p1, result is: ", result))
  
  p2.then(result => console.log("Then of p1, result is: ", result));

}