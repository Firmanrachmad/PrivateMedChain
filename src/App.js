import logo from './logo.svg';
import Home from './pages/home'
import Upload from './pages/upload'
import Documents from './pages/documents'
import Navbarz from "./components/navbar"
import Pasien from './pages/pasien'
import Tenaga from './pages/tenaga'
import Login from './pages/login'
import {Routes, Route} from "react-router-dom";

function App() {
  return (<>
  <Navbarz/>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/login" element={<Login />}/>
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
