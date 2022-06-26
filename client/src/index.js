import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './Store';
import { Provider } from 'react-redux';


// if (process.env.REACT_APP_EDITOR === 'code') {
//   require('./assets/themes/soho/soho-dark/theme.scss');
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={ store }>
      <App />
    </Provider>
);

