import logo from './logo.svg';
import Home from './pages/home'
import Upload from './pages/upload'
import Documents from './pages/documents'
import Navbar from "./components/navbar"
import Pasien from './pages/pasien'
import Tenaga from './pages/tenaga'
import {Routes, Route} from "react-router-dom";

function App() {
  return (<>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/upload" element={<Upload />}/>
    <Route path="/documents" element={<Documents />}/>
    <Route path="/pasien" element={<Pasien />}/>
    <Route path="/tenaga" element={<Tenaga />}/>
  </Routes>
  </>

    // <div className="App">
    //   <Navbar/>
    //   <Home/>
    // </div>
  );
}

export default App;
