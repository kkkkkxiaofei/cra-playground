import React from 'react';
import ReactReduxContext from './ReactReduxContext';
import Subscription from '../utils/Subscription';

const Provider = ({ store, context, children }) => {
  const Context = context || ReactReduxContext;
  const subscription = new Subscription(store);
  const contextValue = {
    store,
    subscription
  };
  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  )
};

export default Provider;