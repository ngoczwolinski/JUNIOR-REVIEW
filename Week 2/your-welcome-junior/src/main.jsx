import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // store is the ultimate truth in a redux application
  <Provider store={store}>  
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider> ,
)
