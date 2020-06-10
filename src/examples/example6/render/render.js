import ReactReconciler from 'react-reconciler';

const hostContext = {}, childContext = {};

const hostConfig = {
  getRootHostContext() {
    console.log('getRootHostContext');
    return hostContext;
  },
  getChildHostContext() {
    console.log('getChildHostContext');
    return childContext;
  },
  shouldSetTextContent(type, props) {
    console.log('shouldSetTextContent', type, props);
    return typeof props.children === 'string' || typeof props.children === 'number';
  },
  prepareUpdate(domElement, oldProps, newProps) {
    return true;
  },
  prepareForCommit() {
    console.log('prepareForCommit');
  },
  resetAfterCommit() {
    console.log('resetAfterCommit');
  },
  commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
    console.log(updatePayload, oldProps, newProps, 'commitUpdate')
    Object.keys(newProps).forEach(propName => {
      const propValue = newProps[propName];
      if (propName === 'children') {
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          domElement.textContent = propValue;
        }
      } else if (propName === 'onClick') {
        domElement.addEventListener('click', propValue);
      } else if (propName === 'className') {
        domElement.setAttribute('class', propValue);
      } else {
        const propValue = newProps[propName];
        domElement.setAttribute(propName, propValue);
      }
    });
  },
  commitTextUpdate(textInstance, oldText, newText) {
    console.log(oldText, newText, 'commitTextUpdate')
    textInstance.text = newText;
  },
  createTextInstance(text) {
    console.log('createTextInstance');

    return document.createTextNode(text);
  },
  createInstance(type, newProps) {
    console.log('createInstance');

    const domElement = document.createElement(type);
    Object.keys(newProps).forEach(propName => {
      const propValue = newProps[propName];
      if (propName === 'children') {
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          domElement.textContent = propValue;
        }
      } else if (propName === 'onClick') {
        domElement.addEventListener('click', propValue);
      } else if (propName === 'className') {
        domElement.setAttribute('class', propValue);
      } else {
        const propValue = newProps[propName];
        domElement.setAttribute(propName, propValue);
      }
    });
    return domElement;
  },
  appendInitialChild(parent, child) {
    console.log('appendInitialChild');

    parent.appendChild(child);
  },
  finalizeInitialChildren() {
    console.log('finalizeInitialChildren');
  },
  appendChildToContainer: (parent, child) => {
    console.log('appendChildToContainer');

    parent.appendChild(child);
  },
  removeChild(parent, child) {
    console.log('removeChild');

    parent.removeChild(child);
  },
  appendChild(parent, child) {
    console.log('appendChild');

    parent.appendChild(child);
  },
  unhideInstance() {
    console.log('unhideInstance');
  },
  supportsMutation: true
  
};

const reconciler = ReactReconciler(hostConfig);

export default {
  render(reactElement, domElement, callback) {

    if (!domElement._rootContainer) {
      domElement._rootContainer = reconciler.createContainer(domElement, false);
    }

    return reconciler.updateContainer(reactElement, domElement._rootContainer, null, callback);
  }
};