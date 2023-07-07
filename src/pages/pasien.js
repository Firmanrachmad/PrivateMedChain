import { useState } from "react";
import "../App.css";

function Pasien() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({
        name,
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      alert("Data saved succesfully");
      setEmail("");
      setName("");
    }
  };

  return (
    <div>
      <div className="addDocuments">
        <form action="">
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password" placeholder="password" />
          <button type="submit" onClick={handleOnSubmit}>
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Pasien;
