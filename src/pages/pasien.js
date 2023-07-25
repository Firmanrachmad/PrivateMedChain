import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { Button, Row, Col, Form, Card } from "react-bootstrap";
import {
  PersonFill,
  EnvelopeFill,
  LockFill,
  WalletFill,
} from "react-bootstrap-icons";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { toast } from "react-toastify";
import {
  useRegisterMutation,
  useAllUserMutation,
  useDeleteUserMutation,
} from "../slices/usersApiSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { contractAddress } from "../utils/globalVar";
import MedRec from "../artifacts/contracts/Medrec.sol/Medrec.json";
import { ethers } from "ethers";

function Pasien() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ethaddress, setEthAddress] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [register] = useRegisterMutation();
  const [alluser] = useAllUserMutation();
  const [deleteuser] = useDeleteUserMutation();

  const navigate = useNavigate();

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await alluser({});
      const filteredUsers = res.data.users.filter((user) => user.roles === "P");
      setUsers(filteredUsers);
      setLoading(false);
      console.log(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUsers = async (id) => {
    try {
      await deleteuser({
        _id: id,
      });
      toast.success("User Deleted!");
      navigate("/pasien");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function setPatient(address) {
    // If MetaMask exists
    try {
      if (typeof window.ethereum !== "undefined") {
        await requestAccount();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          MedRec.abi,
          signer
        );
        const transaction = await contract.addPatient(address);

        await transaction.wait();
        toast.success("Patient Added to Blockchain");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const roles = "P";
        setPatient(ethaddress);
        const res = await register({
          name,
          email,
          password,
          roles,
          ethaddress,
        }).unwrap();
        console.log(res);
        navigate("/pasien");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="justify-content-md-center mt-5 mt-md-3">
        <Col xs={12} md={6} className="card p-5">
          <h1 className="text-center mb-4">Add New Pasien</h1>
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

            <Form.Group className="my-2" controlId="ethaddress">
              <Form.Label>
                <WalletFill className="me-2" size={18} />
                Ethereum Address
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Ethereum Address"
                value={ethaddress}
                onChange={(e) => setEthAddress(e.target.value)}
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
              variant="success"
              className="mt-3 d-inline-flex align-items-center"
            >
              <BsFillPersonPlusFill className="me-2" size={18} />
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      <Row
        className="user justify-content-md-center mt-3"
        style={{ margin: "0 20px" }}
      >
        {users &&
          users.map((user) => (
            <Col md={5} className="mb-3" key={user._id}>
              <Card className="user">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <PersonFill className="me-2" size={18} />
                    <Card.Title>Patient's Identity</Card.Title>
                  </div>
                  <hr style={{ borderTop: "4px solid #ccc" }} />
                  <Card.Text>Name: {user.name}</Card.Text>
                  <Card.Text>ETH Address: {user.ethaddress}</Card.Text>
                  <Card.Text>Date Created: {user.createdAt}</Card.Text>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Link to={`/changeuserbyid/${user._id}`}>
                      <FaEdit
                        className="me-2"
                        type="button"
                        size={18}
                        style={{ color: "black" }}
                      />
                    </Link>
                    <FaTrash
                      className="me-2"
                      type="button"
                      size={18}
                      onClick={() => deleteUsers(user._id)}
                      style={{ color: "black" }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}

export default Pasien;
