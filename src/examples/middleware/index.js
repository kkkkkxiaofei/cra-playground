import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const MiddleWareComponent = ({ test, suspense, suspenseDate }) => {
  useEffect(() => { test() }, []);
  return <h1 onClick={() => suspense()}>123</h1>
};

const mapPropsToState = state => {
  return ({
    suspenseDate: state.reducers.suspense.data
  });
}

const mapDispatchToState = dispatch => ({
  test: () => dispatch({ type: 'TEST' }),
  suspense: () => dispatch({ type: 'SUSPENSE' })
});

export default connect(mapPropsToState, mapDispatchToState)(MiddleWareComponent);