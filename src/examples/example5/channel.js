const channel = new BroadcastChannel('sw-messages');

let _receiver, errorHandler = $ => console.log($);

const MyChannel = {
  addListener: receiver => {
    _receiver = receiver;
    channel.addEventListener('message', _receiver, false);
    channel.addEventListener('messageerror', errorHandler, false);
    
  },
  removeListener: () => {
    channel.removeEventListener('message', _receiver, false);
    channel.removeEventListener('messageerror', errorHandler, false);
  },
  postMessage: msg => channel.postMessage(msg),
  isReady: () => !!_receiver
};

export default MyChannel;