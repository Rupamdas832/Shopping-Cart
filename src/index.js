import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MockServer from "../src/Api/mockServer";
import { StoreProvider } from './Store/context';
import { ProductProvider } from './Product/productContext';

MockServer();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <ProductProvider>
        <App />
      </ProductProvider>  
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
