import { useState } from 'react';
import { ethers } from 'ethers';
import MedRec from "../artifacts/contracts/Medrec.sol/Medrec.json";
import '../App.css';

const textAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function Home(){

    const [message, setMessage] = useState("");
    const [currentText, setCurrentText] = useState("");

    // Fungsi Helper

    // Request ke dalam akun MetaMask
    async function requestAccount() {
        await window.ethereum.request({method: 'eth_requestAccounts'});
    }

    // Mengambil nilai yang tersimpan pada MedRec
    async function getText() {
        // If terkoneksi MetaMask
        if (typeof window.ethereum !== 'undefined'){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(textAddress, MedRec.abi, provider);
        try {
            const data = await contract.teks();
            console.log("data: ", data);
            setCurrentText(data);
        } catch (error) {
            console.log("error: ", error);
        }
        }
    }

    async function setText(){
        if (!message) return;
        // If terkoneksi MetaMask
        if (typeof window.ethereum !== 'undefined'){
        await requestAccount();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(textAddress, MedRec.abi, signer);
        const transaction = await contract.textInput(message);

        setMessage("");
        await transaction.wait();
        getText();

        }

    }

    return (
        <div className="App-header">
            <div>
                <input 
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Set Text Here"
                className='custom-input'/>
                <button onClick={setText} className='set-button'>Set!</button>
            </div>
            <div>
                <button onClick={getText} className='get-button'>Get</button>
            </div>
            <h2 className='teks'>{currentText}</h2>
        </div>
    );

    
    
}

export default Home;