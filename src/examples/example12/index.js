import React, { Component } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  increment,
  asyncIncrement,
  callFakeApi
} from './actions'

const mapStateToProps = state => ({
  count: state.count,
  user: state.user
})

const Saga = props => {
  const handleAsyncIncrement = seconds => asyncIncrement(seconds)
  const { count, user } = useSelector(mapStateToProps)
  return (
    <div>
      <div className="count">{count}</div>
      <button onClick={increment}>
        Synchronous Increment
      </button>
      <button onClick={() => handleAsyncIncrement(3)}>
        Increment After 3 seconds
      </button>
      <button onClick={() => handleAsyncIncrement(5)}>
        Increment After 5 seconds
      </button>
      <button onClick={callFakeApi}>Call Fake Api</button>
      {user && <div className="user">{user}</div>}
    </div>
   )
}

export default Saga

