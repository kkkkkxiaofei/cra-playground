export function register() {
  window.addEventListener('load', () => {
    const swUrl = `/online-editor-sw.js`;
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(swUrl, {scope: './'}).then(function(registration) {
        console.log('Service worker registration succeeded:', registration);
      }, /*catch*/ function(error) {
        console.log('Service worker registration failed:', error);
      });
    } else {
      console.log('Service workers are not supported.');
    }
  });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
