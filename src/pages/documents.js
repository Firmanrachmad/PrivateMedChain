import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { ethers } from "ethers";
import MedRec from "../artifacts/contracts/Medrec.sol/Medrec.json";

const textAddress = "0x1e5b4c061f9D6EE96f491955F719293599412bE1";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const getDocuments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/backend/v1/documents/file"
      );
      setDocuments(res.data.asymmetrics);
      setLoading(false);
      console.log(res.data.asymmetrics);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  const decryptFile = async (encryptedId) => {
    setLoading(true);
    try {
      // console.log(encryptedId);
      const encodedId = encodeURIComponent(encryptedId);
      // console.log(encodedId);
      // const decodedId = decodeURIComponent(encodedId);
      // console.log(decodedId);
      const res = await axios.get(
        `http://localhost:5000/backend/v1/documents/decrypt/${encodedId}`
      );
      const decryptedData = res.data;
      console.log(decryptedData);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadFile = async (id) => {
    // if (typeof window.ethereum !== "undefined") {
      // await requestAccount();

      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();

      // const contract = new ethers.Contract(textAddress, MedRec.abi, signer);

      try {
        console.log(id);
        const res = await axios.get(
          `http://localhost:5000/backend/v1/documents/download/${id}`,
          { responseType: "blob" }
        );
        const blob = new Blob([res.data], { type: res.data.type });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "file";
        // link.download = res.headers["content-disposition"].split("filename=")[1];
        link.click();
      } catch (error) {
        console.log(error);
      }
    // }
  };

  return (
    <div>
      <div className="documents">
        {documents &&
          documents.map((document) => (
            <div className="document" key={document._id}>
              <h3>{document.encryptedId}</h3>
              <button onClick={() => decryptFile(document.encryptedId)}>
                Download File
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Documents;
