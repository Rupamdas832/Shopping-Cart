import './App.css';
import Header from './Pages/Header';
import HeroSection from './Pages/HeroSection';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <HeroSection/>
      </BrowserRouter>
    </div>
  );
}

export default App;
