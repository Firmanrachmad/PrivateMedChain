import React, { useState, useEffect } from "react";
import "../App.css";
import "../style/card.css";
import axios from "axios";
import { ethers } from "ethers";
import MedRec from "../artifacts/contracts/Medrec.sol/Medrec.json";
import { Card, Button, Row, Col, Form } from "react-bootstrap";

import { FileTextFill } from "react-bootstrap-icons";
import { BsCloudDownload, BsFillFileEarmarkTextFill } from "react-icons/bs";

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
      <Row
        className="documents justify-content-md-center mt-3"
        style={{ margin: "0 20px" }}
      >
        {documents &&
          documents
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((document) => (
              <Col md={4} className="mb-3" key={document._id}>
                <Card className="document card-shadow">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3 ">
                    <BsFillFileEarmarkTextFill className="me-2" size={18} />
                      <Card.Title>Patient's Record</Card.Title>
                    </div>
                    <Card.Text>
                      Date Created:{" "}
                      {new Date(document.date).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </Card.Text>
                    <Button
                      variant="success"
                      onClick={() => decryptFile(document.encryptedId)}
                      className="mt-3"
                    >
                    <BsCloudDownload className="me-2" size={18} />
                      Download
                    </Button>
                    <Card.Link href="#" />
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
    </div>
  );
}

export default Documents;
