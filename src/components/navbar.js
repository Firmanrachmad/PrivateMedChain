import '../App.css';
import Home from '../pages/home'
import Upload from '../pages/upload'
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";

function Navbar(){
    return (
            <div>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/upload">Upload File</a></li>
                </ul>
            </div>
        
    )

}

export default Navbar