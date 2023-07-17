import logo from './logo.svg';
import Home from './pages/home'
import Upload from './pages/upload'
import Documents from './pages/documents'
import Navbarz from "./components/navbar"
import Pasien from './pages/pasien'
import Tenaga from './pages/tenaga'
import Login from './pages/login'
import Testing from './pages/testing'
import Profile from './pages/profile'
import {Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (<>
  <Navbarz/>
  <ToastContainer />
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/upload" element={<Upload />}/>
    <Route path="/documents" element={<Documents />}/>
    <Route path="/pasien" element={<Pasien />}/>
    <Route path="/tenaga" element={<Tenaga />}/>
    <Route path="/testing" element={<Testing />}/>
    <Route path="/profile" element={<Profile />}/>
  </Routes>
  </>

    // <div className="App">
    //   <Navbar/>
    //   <Home/>
    // </div>
  );
}

export default App;
