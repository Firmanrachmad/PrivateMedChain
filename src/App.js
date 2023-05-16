import logo from './logo.svg';
import Home from './pages/home'
import Upload from './pages/upload'
import Transactions from './pages/transactions'
import Navbar from "./components/navbar"
import {Routes, Route} from "react-router-dom";

function App() {
  return (<>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/upload" element={<Upload />}/>
    <Route path="/transactions" element={<Transactions />}/>
  </Routes>
  </>

    // <div className="App">
    //   <Navbar/>
    //   <Home/>
    // </div>
  );
}

export default App;
