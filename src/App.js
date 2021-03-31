import { useState } from 'react';
import './App.css';
import { StoreProvider } from './Store/context';
import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [route, setRoute] = useState("home")
  return (
    <div className="App">
    <StoreProvider>
      <BrowserRouter>
        <Header setRoute={setRoute}/>
        <HeroSection route={route}/>
      </BrowserRouter>
    </StoreProvider> 
    </div>
  );
}

export default App;
