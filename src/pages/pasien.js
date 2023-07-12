import { useState } from "react";
import "../App.css";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";

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
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6} className="card p-5">
        <h1 className="text-center mb-4">Add New Pasien</h1>

        <Form>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Name</Form.Label>
            <Form.Control type="email" placeholder="Enter name"></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Pasien;
