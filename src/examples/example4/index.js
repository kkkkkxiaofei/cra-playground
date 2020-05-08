import React, { useEffect } from 'react';
import MyPromise  from './MyPromise';

const PromiseDIY = props => {
  useEffect(() => {
    const p1 = new MyPromise(function (resolve) {
      setTimeout(function () {
        resolve('value1');
      }, 5000);
    });
    
    const p2 = p1.then(result => {
      console.log("Then of p1, result is: ", result);
      return Promise.resolve(result);
    });
    
    p2.then(result => console.log("Then of p2, result is: ", result));
  }, []);
  

  return (
    <div>
      please have a quick look at the console...
    </div>
  );
};

export default PromiseDIY;
