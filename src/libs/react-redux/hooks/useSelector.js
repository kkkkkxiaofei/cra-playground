import { useMemo, useContext, useRef, useEffect, useReducer } from 'react';
import ReactReduxContext from '../components/ReactReduxContext';
import Subscription from '../utils/Subscription';

const refEqual = (a, b) => a === b;

const useSelector = (selector, equalFn = refEqual) => {
  const { store, subscription: parentSub } = useContext(ReactReduxContext);
  // const subscription = new Subscription()
  const storeState = store.getState();
  const latestSelector = useRef();
  const latestSelectorState = useRef();
  const selectorState = useMemo(() => 
    selector(storeState), 
    [selector, latestSelectorState.current]
  );
  const subscription = useMemo(() => 
    new Subscription(store, parentSub),
    [store, parentSub]
  );
  
  const [, forceRender] = useReducer(i => i + 1, 0);

  useEffect(() => {
    latestSelector.current = selector;
    latestSelectorState.current = selectorState;
  });

  useEffect(() => {
    const check = () => {
      const nextState = selector(store.getState());
      if (!equalFn(latestSelectorState.current, nextState)) {
        latestSelectorState.current = nextState;  
        forceRender();
      }
    }
    subscription.onStateChange = check;
    subscription.trySubscribe();
    
    check();
  }, [subscription, store, latestSelectorState.current])

  return selectorState;
};

export default useSelector;