import React, { useState } from 'react'

function Upload () {

    const [image, setImage] = useState("");

    function converttoBase64(e){
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }

    function uploadImage (){
        fetch("http://localhost:5000/upload-image", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ 
                base64:image
            })
        }).then((res) => res.json()).then((data) => console.log(data))
    }

    // const handleOnSubmit = async (e) => {
    //     e.preventDefault();
    //     let result = await fetch(
    //     'http://localhost:5000/upload-image', {
    //         method: "post",
    //         body: JSON.stringify({
    //             base64:image
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     result = await result.json();
    //     console.warn(result);
    //     if (result) {
    //         alert("Data saved succesfully");
    //         setImage("");
    //     }
    // }

    return (
        <div className="App">
                <div className="row">
                    <form>
                        <h2>Upload Page</h2>
                        <div className="form-group">
                            <input 
                            accept="image/*"
                            type="file"
                            onChange={converttoBase64} 
                            /><br></br>
                            {image==""||image==null?"": <img width={100} height={100} src={image}/>}
                        </div>
                        <div className="form-group">
                            <button onClick={uploadImage}>Upload</button>
                        </div>
                    </form>
            </div>
        </div>
        
        
    )
}

export default Upload;