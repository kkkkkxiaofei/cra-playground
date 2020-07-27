import React, { 
  useContext, 
  memo, 
  useMemo, 
  useRef, 
  useReducer,
  useEffect, 
} from 'react';
import selectFactory from './selectFactory';
import ReactReduxContext from '../components/ReactReduxContext';
import Subscription from '../utils/Subscription';
import shallowEqual from '../utils/shallowEqual';

const strictEqual = (a, b) => a === b;

const connect = (
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    pure = true,
    areStatesEqual = strictEqual,
    //todo: use shallow equal
    areOwnPropsEqual = shallowEqual,
    areStatePropsEqual = shallowEqual,
    areMergedPropsEqual = shallowEqual,
    ...extraOptions
  } = {}
) => {

  //todo: memorize
  const wrappedSelectFactory = selectFactory(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    {
      areOwnPropsEqual,
      areStatePropsEqual,
      areMergedPropsEqual
    }
  );
  
  return WrappedComponent => {
    const ConnectFunction = ownProps => {
      const { store, subscription: parentSub } = useContext(ReactReduxContext);
      const subscription = useMemo(() => {
        return new Subscription(store, parentSub)
      }, [store, parentSub]);
      const finalPropsSelector = wrappedSelectFactory(store);
      const [any, forceRender] = useReducer(i => i + 1, 0);
      const latestOwnProps = useRef(ownProps);
      const latestFinalProps = useRef();
      const latestfinalPropsFromStoreUpdated = useRef();
      const usePure = pure ? useMemo : cb => cb();

      const actualFinalProps = usePure(() => {
        if (latestfinalPropsFromStoreUpdated.current) {
          return latestfinalPropsFromStoreUpdated.current;
        }
        return finalPropsSelector(ownProps);
      }, [ownProps, any, latestfinalPropsFromStoreUpdated]);

      useEffect(() => { 
        const check = () => {
          const newProps = finalPropsSelector(latestOwnProps.current);
          console.log(newProps === latestFinalProps.current, newProps)
          if (newProps === latestFinalProps.current) {
            subscription.notify();
          } else {
            latestOwnProps.current = ownProps;
            latestFinalProps.current = newProps;
            latestfinalPropsFromStoreUpdated.current = newProps;
            forceRender();
          }
        };
        subscription.onStateChange = check;
        subscription.trySubscribe();
      });

      return <WrappedComponent {...actualFinalProps} />
    }
    return pure ? memo(ConnectFunction) : ConnectFunction;
  };
}

export default connect;