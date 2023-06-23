import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import axios from "axios";

const Upload = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");

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

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div>
      <div className="addDocuments">
        <input
          type="text"
          placeholder="add name"
          onChange={(e) => setName(e.target.value)}
        />
        <input type="file" ref={fileInputRef} />
        <button onClick={addDocuments}>Add</button>
      </div>
      <div className="documents">
        {documents &&
          documents.map((document) => (
            <div className="document" key={document._id}>
              <h3>{document.name}</h3>
              <button onClick={() => downloadFile(document._id)}>
                Download File
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Upload;
