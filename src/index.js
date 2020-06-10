import React from 'react';
// import ReactDOM from 'react-dom';
import CustomRender from './examples/example6/render/render';
import './index.css';
import App from './App';
import * as serviceWorker from './onlineCodingSw';

CustomRender.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();



