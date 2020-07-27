const defaultMergeProps = (ownProps, stateProps, dispatchProps) => 
({...ownProps, ...stateProps, ...dispatchProps});

export default (
  mapStateToProps = () => ({}),
  mapDispatchToProps = () => ({}),
  mergeProps = defaultMergeProps,
  {
    areOwnPropsEqual,
    areStatePropsEqual,
    areMergedPropsEqual
  }
) => {
  return store => ownProps => {
    const state = store.getState();
    const stateProps = mapStateToProps(state);
    const dispatchProps = mapDispatchToProps(store.dispatch);
    return mergeProps(ownProps, stateProps, dispatchProps);
  };
};