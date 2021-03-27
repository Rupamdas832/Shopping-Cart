import { useState } from 'react';
import './App.css';
import { CartProvider } from './Cart/CartContext';
import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import ProductsList from './Product/ProductsList';

function App() {
  const [route, setRoute] = useState("home")
  return (
    <div className="App">
    <CartProvider>
      <Header setRoute={setRoute}/>
      <HeroSection route={route}/>
    </CartProvider> 
    </div>
  );
}

export default App;
