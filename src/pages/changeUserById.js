import { React, useState, useEffect } from "react";
import "../App.css";
import { Button, Row, Col, Form } from "react-bootstrap";
import {
  PersonFill,
  EnvelopeFill,
  LockFill,
} from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { useGetUserIdMutation, useUpdateUserIdMutation } from "../slices/usersApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";

function ChangeUserById() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [getuserid] = useGetUserIdMutation();
  const [updateuserid] = useUpdateUserIdMutation();

  const navigate = useNavigate();

  const getUsers = async () => {
    toast.warning("PERINGATAN! Mengganti password tanpa password lama akan berdampak pada Ethereum Address!");
    try {
      const res = await getuserid({
        _id: id,
      });
      setName(res.data.user.name);
      setEmail(res.data.user.email);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateuserid({
          _id: id,
          name,
          email,
          password,
        }).unwrap();
        console.log(res);
        toast.success("User Successfully Edited!");
        navigate(-1);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  useEffect(() => {
    
    getUsers();
  }, []);

  return (
    <Row className="justify-content-md-center mt-5 mt-md-3">
      <Col xs={12} md={6} className="card p-5">
        <h1 className="text-center mb-4">Change User By Id</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>
              <PersonFill className="me-2" size={18} />
              Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Label>
              <EnvelopeFill className="me-2" size={18} />
              Email Address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>
              <LockFill className="me-2" size={18} />
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>
              <LockFill className="me-2" size={18} />
              Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password Confirmation"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="mt-3 d-inline-flex align-items-center"
          >
            <FaUserEdit className="me-2" size={18} />
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default ChangeUserById;
