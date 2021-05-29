import "./App.css";
import { Header, HeroSection, Footer } from "./Components";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <HeroSection />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
