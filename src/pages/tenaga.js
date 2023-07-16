import { React } from "react";
import "../App.css";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { PersonFill, EnvelopeFill, LockFill, WalletFill } from 'react-bootstrap-icons';
import { BsFillPersonPlusFill } from "react-icons/bs";

function Tenaga() {
  return (
    <Row className="justify-content-md-center mt-5 mt-md-3">
      <Col xs={12} md={6} className="card p-5">
        <h1 className="text-center mb-4">Add New Tenaga Kesehatan</h1>

        <Form>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>
              <PersonFill className="me-2" size={18} />
              Name
            </Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Label>
              <EnvelopeFill className="me-2" size={18} />
              Email Address
            </Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>
              <LockFill className="me-2" size={18} />
              Password
            </Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>

          <Form.Group className="my-2" controlId="ethereumAddress">
            <Form.Label>
              <WalletFill className="me-2" size={18} />
              Ethereum Address
            </Form.Label>
            <Form.Control type="text" placeholder="Enter Ethereum Address" />
          </Form.Group>

          <Button type="submit" variant="success" className="mt-3 d-inline-flex align-items-center">
          <BsFillPersonPlusFill className="me-2" size={18} />
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Tenaga;
