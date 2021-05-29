import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider, CheckoutProvider, StoreProvider, UserProvider } from './Store';
import { ProductProvider } from './Product/productContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <StoreProvider>
      <UserProvider>
        <ProductProvider>
          <CheckoutProvider>
            <App />
          </CheckoutProvider> 
        </ProductProvider>
      </UserProvider>   
      </StoreProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
