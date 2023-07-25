import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import "../style/card.css";
import axios from "axios";
import { Button, Row, Col, Form } from "react-bootstrap";
import { PersonFill, FileEarmarkFill } from "react-bootstrap-icons";
import {
  BsFillCloudUploadFill,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";
import { useAllUserMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { contractAddress } from "../utils/globalVar";
import MedRec from "../artifacts/contracts/Medrec.sol/Medrec.json";
import { ethers } from "ethers";

const Upload = () => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [ethaddress, setEthAddress] = useState("");

  const [alluser] = useAllUserMutation();

  const navigate = useNavigate();

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await alluser({});
      const filteredUsers = res.data.users.filter((user) => user.roles === "P");
      setUsers(filteredUsers);
      setLoading(false);
      console.log(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const addDocuments = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", fileInputRef.current.files[0]);
      const res = await axios.post(
        "http://localhost:5000/backend/v1/documents",
        formData
      );
      const documentId = res.data.document._id;
      encryptFile(documentId);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err.error);
    }
  };

  const encryptFile = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/backend/v1/documents/encrypt/${id}`
      );
      setRecord(res.data.encryptedId, ethaddress);
    } catch (error) {
      console.log(error);
    }
  };

  async function setRecord(hashValue, ethaddress) {
    // If MetaMask exists
    try {
      if (typeof window.ethereum !== "undefined") {
        await requestAccount();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Create contract with signer
        /*
          function addRecord(string memory _hashValue, address _patienAddress) external {
            require(_patienAddress != address(0));
            require(patient[_patienAddress]);
            uint256 _id = _generateId(_patienAddress, msg.sender);
            _listId[_patienAddress].push(_id);
            _idToRecord[_id] = Record(_hashValue, _patienAddress, msg.sender, block.timestamp);
          } 
        */

        const contract = new ethers.Contract(
          contractAddress,
          MedRec.abi,
          signer
        );
        const transaction = await contract.addRecord(hashValue, ethaddress);

        await transaction.wait();
        toast.success("Document Added to Blockchain");
        navigate("/upload");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <div>
      <Row className="justify-content-md-center mt-5 mt-md-3">
        <Col xs={12} md={6} className="card p-5 card-shadow">
          <h1 className="text-center mb-4">Add New Record</h1>
          <Form>
            <Form.Group controlId="patientname" className="mb-3 users">
              <Form.Label>
                <PersonFill className="me-2" size={18} />
                Patient's Name
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={ethaddress} // Bind the value of the select to the ethaddress state
                onChange={(e) => setEthAddress(e.target.value)} // Update ethaddress when an option is selected
              >
                <option value="">Select Patient</option>
                {users &&
                  users.map((user) => (
                    <option key={user._id} value={user.ethaddress}>
                      {user.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="name" className="mb-3">
              <Form.Label>
                <BsFillFileEarmarkTextFill className="me-2" size={18} />
                Document's Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Add Document's Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="file" className="mb-3">
              <Form.Label>
                <FileEarmarkFill className="me-2" size={18} />
                File
              </Form.Label>
              <Form.Control type="file" ref={fileInputRef} />
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              onClick={addDocuments}
              className="mt-3"
            >
              <BsFillCloudUploadFill className="me-2" size={18} />
              Add
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Upload;
