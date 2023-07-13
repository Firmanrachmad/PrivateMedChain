import { React } from "react";
import "../App.css";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";

function Tenaga() {
  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6} className="card p-5">
        <h1 className="text-center mb-4">Add New Tenaga Kesehatan</h1>

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

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Ethereum Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Ethereum Address"
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="success" className="mt-3">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Tenaga;
