import './App.css';
import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <HeroSection/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
