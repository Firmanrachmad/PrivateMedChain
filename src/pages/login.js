import { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import {
  EnvelopeFill,
  LockFill,
} from "react-bootstrap-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6} className="card p-5">
        <h1 className="text-center mb-4">Private EMR</h1>
        <p className="text-center mb-4">
          Electronic Medical Records (EMR) using Private Blockchain Ethereum
        </p>
        <h2 className="text-center mb-4">Log In</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label><EnvelopeFill className="me-2" size={18} />Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label><LockFill className="me-2" size={18} />Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="success" className="mt-3">
            Sign In
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
