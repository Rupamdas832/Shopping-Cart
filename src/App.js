import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import ProductsList from './Product/ProductsList';

function App() {
  const [route, setRoute] = useState("home")
  return (
    <div className="App">
      <Header setRoute={setRoute}/>
      <HeroSection route={route}/>
    </div>
  );
}

export default App;
