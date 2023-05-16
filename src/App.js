import logo from './logo.svg';
import Home from "./pages/home"
import Upload from "./pages/upload"
import Navbar from "./components/navbar"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  // Return
  
  return (
    <div className="App">
      <Navbar/>
      <Home/>
    </div>
  );
}

export default App;
