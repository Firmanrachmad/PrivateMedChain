import { useState, useEffect } from "react";
import "../App.css";
import { Button, Row, Col, Form } from "react-bootstrap";
import { PersonFill, EnvelopeFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { FaEdit } from "react-icons/fa";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { FaKey } from "react-icons/fa6";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile] = useUpdateUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        oldPassword,
        newPassword,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Password Updated!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Row className="justify-content-md-center mt-5 mt-md-3">
      <Col xs={12} md={6} className="card p-5">
        <h1 className="text-center mb-4">Change Password</h1>
        {userInfo ? (
          <>
            <Form onSubmit={submitHandler}>
              <Form.Group className="my-2" controlId="oldPassword">
                <Form.Label>
                  <FaKey className="me-2" size={18} />
                  Old Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="newPassword">
                <Form.Label>
                  <FaKey className="me-2" size={18} />
                  New Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button
                type="submit"
                variant="warning"
                className="mt-3 d-inline-flex align-items-center"
              >
                <FaEdit className="me-2" size={18} />
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

export default ChangePassword;
