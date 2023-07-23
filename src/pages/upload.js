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

const Upload = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [ethaddress, setEthAddress] = useState("");
  const [hashvalue, setHashValue] = useState("");

  const [alluser] = useAllUserMutation();
  
  const navigate = useNavigate();

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

  const getDocuments = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/backend/v1/documents");
      setDocuments(res.data.documents);
      setLoading(false);
      console.log(res.data.documents);
    } catch (error) {
      console.log(error);
    }
  };

  const addDocuments = async (e) => {
    e.preventDefault();
    try {
      // console.log(name);
      // console.log(fileInputRef);
      // console.log(ethaddress);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", fileInputRef.current.files[0]);
      const res = await axios.post(
        "http://localhost:5000/backend/v1/documents",
        formData
      );
      console.log(res);
      const documentId = res.data.document._id;
      encryptFile(documentId);
      toast.success("Upload Successful!");
      navigate('/upload');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err.error);
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
      // link.download = res.headers["content-disposition"].split("filename=")[1];
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const encryptFile = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/backend/v1/documents/encrypt/${id}`
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

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
                    <option key={user._id} value={user.ethaddress.address}>
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
