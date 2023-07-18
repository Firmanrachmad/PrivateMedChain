import { useState, useEffect } from "react";
import "../App.css";
import { Button, Row, Col, Form } from "react-bootstrap";
import { PersonFill, EnvelopeFill } from "react-bootstrap-icons";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { FaUserEdit } from "react-icons/fa";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

function ChangeProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile] = useUpdateUserMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
      }).unwrap();
      dispatch(setCredentials({...res}));
      toast.success('Profile Updated!');
    } catch (err) {
        toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Row className="justify-content-md-center mt-5 mt-md-3">
      <Col xs={12} md={6} className="card p-5">
        <h1 className="text-center mb-4">Change Profile</h1>
        {userInfo ? (
          <>
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

              <Button
                type="submit"
                variant="primary"
                className="mt-3 d-inline-flex align-items-center"
              >
                <FaUserEdit className="me-2" size={18} />
                Update
              </Button>
            </Form>
          </>
        ) : (
          <></>
        )}
      </Col>
    </Row>
  );
}

export default ChangeProfile;
