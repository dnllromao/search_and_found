import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import App from '../shared/App';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));


// Tutorial : https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
// Tutorial universal: https://medium.com/leanjs/universal-create-react-app-step-by-step-b80ba68d125d