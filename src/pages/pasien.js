import { useState } from "react";
import "../App.css";
import { Button, Row, Col, Form } from "react-bootstrap";
import {
  PersonFill,
  EnvelopeFill,
  LockFill,
  WalletFill,
} from "react-bootstrap-icons";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useRegisterMutation } from "../slices/usersApiSlice";

function Pasien() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ethaddress, setEthAddress] = useState("");

  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();


  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password do not match');
    } else {  
      try {
        const roles = "P";
        const res = await register({ name, email, ethaddress, password, roles}).unwrap();
        console.log(res);
        toast.success('Pasien Successfully Added!');
        window.location.reload();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row className="justify-content-md-center mt-5 mt-md-3">
      <Col xs={12} md={6} className="card p-5">
        <h1 className="text-center mb-4">Add New Pasien</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label><PersonFill className="me-2" size={18} />Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Label><EnvelopeFill className="me-2" size={18} />Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="ethAddress">
            <Form.Label><WalletFill className="me-2" size={18} />ETH Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ethAddress"
              value={ethaddress}
              onChange={(e) => setEthAddress(e.target.value)}
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

          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label><LockFill className="me-2" size={18} />Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password Confirmation"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="success"
            className="mt-3 d-inline-flex align-items-center"
          >
            <BsFillPersonPlusFill className="me-2" size={18} />
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Pasien;
