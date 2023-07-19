import logo from "./logo.svg";
import Home from "./pages/home";
import Upload from "./pages/upload";
import Documents from "./pages/documents";
import Navbarz from "./components/navbar";
import Pasien from "./pages/pasien";
import Tenaga from "./pages/tenaga";
import Login from "./pages/login";
import Testing from "./pages/testing";
import Profile from "./pages/profile";
import ChangeProfile from "./pages/changeProfile";
import ChangePassword from "./pages/changePassword";
import ChangeUserById from "./pages/changeUserById";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const hasRole = (role) => userInfo?.roles?.includes(role);

  useEffect(() => {
    if (!userInfo) {
      // Jika pengguna belum login, arahkan ke halaman login
      navigate('/login');
    } 
  }, [userInfo, navigate]);


  return (
    <>
      <Navbarz />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Hanya peran PRK yang dapat mengakses halaman Pasien */}
        {hasRole('PRK') && <Route path="/pasien" element={<Pasien />} />}
        {/* Hanya peran PRK yang dapat mengakses halaman Tenaga */}
        {hasRole('PRK') && <Route path="/tenaga" element={<Tenaga />} />}
        {/* Hanya peran TK yang dapat mengakses halaman Upload */}
        {hasRole('TK') && <Route path="/upload" element={<Upload />} />}
        <Route path="/documents" element={<Documents />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/changeprofile" element={<ChangeProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/changeuserbyid/:id" element={<ChangeUserById />} />
      </Routes>
    </>
  );
}

export default App;
