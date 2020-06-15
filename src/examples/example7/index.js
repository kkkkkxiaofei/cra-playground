import React, { useEffect, useState } from 'react';
import SubApp from './SubApp';
import ReactDOM from 'react-dom';

const SubAppContainer = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   ReactDOM.render(<SubApp />, document.getElementById('sub1'));
  //   setIsLoading(false)    
  // }, []);
  
  // return isLoading && <div>loading subapp...</div>;
  return <div>loading subapp...</div>
}

export default SubAppContainer;