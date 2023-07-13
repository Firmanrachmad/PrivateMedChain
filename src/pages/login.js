import React from "react";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";

const Login = () => {
  return (
    // <div className=' py-5'>
    //   <Container className='d-flex justify-content-center'>
    //   </Container>
    // </div>
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6} className="card p-5">
        <h1 className="text-center mb-4">Private EMR</h1>
        <p className="text-center mb-4">
          Electronic Medical Records (EMR) using Private Blockchain Ethereum
        </p>
        <h2 className="text-center mb-4">Sign In</h2>

        <Form>
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

          <Button type="submit" variant="success" className="mt-3">
            Sign In
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
