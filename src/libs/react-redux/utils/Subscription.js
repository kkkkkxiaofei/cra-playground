function Subscription(store, parentSub) {
  const self = this;
  self.store = store;
  self.parentSub = parentSub;
  self.unSubscribe = null;
  self.listeners = [];
  self.subscribe = function(listener) {
    self.listeners.push(listener);
    return () => self.listeners.splice(self.listeners.indexOf(listener), 1);
  };
  self.notify = function() {
    self.listeners.forEach(listener => listener());
  }
  self.onStateChange = null;
  self.handleStateChange = function() {
    if (self.onStateChange) {
      self.onStateChange();
    }
  }
  self.trySubscribe = function() {
    if (!self.unSubscribe) {
      self.unSubscribe = self.parentSub ? 
        self.parentSub.subscribe(self.handleStateChange) :
        self.store.subscribe(self.handleStateChange);
    }
  }

  return self;
}

export default Subscription;
