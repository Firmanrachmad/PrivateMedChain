import React, { useState, useEffect } from "react";
import "../App.css";
import "../style/card.css";
import axios from "axios";
import { Card, Button, Row, Col, Form } from "react-bootstrap";

import { BsCloudDownload, BsFillFileEarmarkTextFill } from "react-icons/bs";
import { toast } from "react-toastify";

import { ethers } from "ethers";
import MedRec from "../artifacts/contracts/Medrec.sol/Medrec.json";
import { contractAddress } from "../utils/globalVar";
import { useSelector } from "react-redux";
import { useAllUserMutation } from "../slices/usersApiSlice";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ethaddress, setEthAddress] = useState("");
  const [users, setUsers] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);

  const [alluser] = useAllUserMutation();

  const getUsers = async () => {
    setLoading(true);
    try {
      if (userInfo.roles === "PRK") {
        const res = await alluser({});
        const filteredUsers = res.data.users.filter(
          (user) => user.roles === "P"
        );
        setUsers(filteredUsers);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userInfo.roles === "PRK") {
      getUsers();
    }
  }, []);

  useEffect(() => {
    if (userInfo.roles === "P") {
      setEthAddress(userInfo.ethaddress);
    }
  }, []);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchRecord() {
    setLoading(true);
    try {
      if (typeof window.ethereum !== "undefined") {
        await requestAccount();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          MedRec.abi,
          signer
        );
        const data = await contract.getRecordLIst(ethaddress);
        console.log("data: ", data);
        setDocuments(data);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  async function getRecord(recordId) {
    setLoading(true);
    try {
      if (typeof window.ethereum !== "undefined") {
        await requestAccount();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          MedRec.abi,
          signer
        );
        const datas = await contract.getRecordData(recordId);
        console.log("data: ", datas);
        decryptFile(datas);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const decryptFile = async (encryptedId) => {
    setLoading(true);
    try {
      const encodedId = encodeURIComponent(encryptedId);
      const res = await axios.get(
        `http://localhost:5000/backend/v1/documents/decrypt/${encodedId}`
      );
      const decryptedData = res.data.decryptedId;
      console.log(decryptedData);
      downloadFile(decryptedData);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadFile = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/backend/v1/documents/download/${id}`,
        { responseType: "blob" }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "file";
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <Row
        className="justify-content-end align-items-center mt-3"
        style={{ margin: "0 20px" }}
      >
        <Col md={6}>
          <Form>
            {userInfo.roles === "P" && (
              <Form.Control
                type="text"
                placeholder={userInfo.ethaddress}
                value={ethaddress}
                onChange={(e) => setEthAddress(e.target.value)}
                disabled
              />
            )}

            {userInfo.roles === "TK" && (
              <Form.Control
                type="text"
                placeholder="Search..."
                value={ethaddress}
                onChange={(e) => setEthAddress(e.target.value)}
              />
            )}

            {userInfo.roles === "PRK" && (
              <Form.Select
                aria-label="Default select example"
                value={ethaddress}
                onChange={(e) => setEthAddress(e.target.value)}
              >
                <option value="">Select Patient</option>
                {users &&
                  users.map((user) => (
                    <option key={user._id} value={user.ethaddress}>
                      {user.name}
                    </option>
                  ))}
              </Form.Select>
            )}
          </Form>
        </Col>
        <Col md={2}>
          <Button variant="primary" onClick={fetchRecord}>
            Search
          </Button>
        </Col>
      </Row>
      <Row
        className="documents justify-content-md-center mt-3"
        style={{ margin: "0 20px" }}
      >
        {documents &&
          documents.map((document) => (
            <Col md={4} className="mb-3" key={document}>
              <Card className="document card-shadow">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3 ">
                    <BsFillFileEarmarkTextFill className="me-2" size={18} />
                    <Card.Title>Patient's Record</Card.Title>
                  </div>
                  <Button
                    variant="success"
                    className="mt-3"
                    onClick={() => getRecord(document)}
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
