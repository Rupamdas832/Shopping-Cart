import { useState } from 'react';
import './App.css';
import { StoreProvider } from './Store/context';
import Header from './Components/Header';
import HeroSection from './Components/HeroSection';

function App() {
  const [route, setRoute] = useState("home")
  return (
    <div className="App">
    <StoreProvider>
      <Header setRoute={setRoute}/>
      <HeroSection route={route}/>
    </StoreProvider> 
    </div>
  );
}

export default App;
