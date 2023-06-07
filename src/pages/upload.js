import React, { useState } from "react";
import axios from 'axios';

function Upload() {
  const [image, setImage] = useState("");
  const [document, setDocument] = useState("");
  const [key, setKey] = useState("");

  function converttoBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  function uploadImage() {
    fetch("http://localhost:5000/upload-image", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        base64: image,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('pdf', file);
  
    axios.post('http://localhost:5000/upload-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('Upload success:', response.data);
        // Lakukan sesuatu setelah file berhasil di-upload
      })
      .catch(error => {
        console.error('Upload error:', error);
        // Lakukan sesuatu jika terjadi error saat upload
      });
  }
  


  return (
    <div className="App">
        <div className="row">
            <form>
            <h2>Upload Image</h2>
            <div className="form-group">
                <input accept="image/*" type="file" onChange={converttoBase64} />
                <br></br>
                {image == "" || image == null ? (
                ""
                ) : (
                <img width={100} height={100} src={image} />
                )}
            </div>
            <div className="form-group">
                <button onClick={uploadImage}>Upload</button>
            </div>
            </form>
        </div>
        <div className="row">
            <form>
            <h2>Upload PDF</h2>
            <div className="form-group">
                <input accept=".pdf" type="file" onChange={handleFileUpload} />
            </div>
            {/* <div className="form-group">
                <button onClick={uploadImage}>Upload</button>
            </div> */}
            </form>
        </div>
    </div>
  );
}

export default Upload;
