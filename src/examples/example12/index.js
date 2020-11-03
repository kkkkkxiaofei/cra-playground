import React, { Component } from 'react';
import { useSelector, useDispatch } from 'libs';
import {
  increment,
  asyncIncrement,
  callFakeApi
} from './actions'

const mapStateToProps = state => ({
  count: state.saga.count,
  user: state.saga.user
})

const Saga = props => {
  const dispatch = useDispatch()
  const handleAsyncIncrement = seconds => dispatch(asyncIncrement(seconds))
  const { count, user } = useSelector(mapStateToProps)
  return (
    <div>
      <div className="count">{count}</div>
      <button onClick={() => dispatch(increment())}>
        Synchronous Increment
      </button>
      <button onClick={() => dispatch(handleAsyncIncrement(3))}>
        Increment After 3 seconds
      </button>
      <button onClick={() => dispatch(handleAsyncIncrement(5))}>
        Increment After 5 seconds
      </button>
      <button onClick={() => dispatch(callFakeApi())}>Call Fake Api</button>
      {user && <div className="user">{user}</div>}
    </div>
   )
}

export default Saga

