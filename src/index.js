import React from 'react';
import ReactDOM from 'react-dom';
import App from './master/App'
import Navbar from './master/Navbar'

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
  </React.StrictMode>,
  document.getElementById('head')
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);