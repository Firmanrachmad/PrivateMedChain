import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import axios from "axios";
import { Card, Button, Row, Col, Form } from "react-bootstrap";

import { FileTextFill } from "react-bootstrap-icons";

const Upload = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [fileName, setfileName] = useState("");

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
      window.location.reload();
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
        <Col xs={12} md={6} className="card p-5">
          <h1 className="text-center mb-4">Add New Record</h1>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Patient's Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add Patient's Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="file">
              <Form.Label>File</Form.Label>
              <Form.Control type="file" ref={fileInputRef} />
            </Form.Group>
            <Button
              type="submit"
              variant="success"
              onClick={addDocuments}
              className="mt-3"
            >
              Add
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="documents justify-content-md-center mt-3">
        {documents &&
          documents.map((document) => (
            <Col md={4} className="document mb-3" key={document._id}>
              <Card>
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <FileTextFill className="me-2" size={18} />
                    <Card.Title>Patient's Record</Card.Title>
                  </div>
                  <Card.Text>{document.name}</Card.Text>
                  <Button
                    variant="success"
                    onClick={() => downloadFile(document._id)}
                    className="mt-3"
                  >
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
};

export default Upload;
