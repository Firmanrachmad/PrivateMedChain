import { Button, Row, Col } from "react-bootstrap";
import {
  PersonFill,
  EnvelopeFill,
  LockFill,
  WalletFill,
} from "react-bootstrap-icons";
import { BiUserCircle } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

function Profile() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <Row className="justify-content-md-center mt-5 mt-md-3">
      <Col xs={12} md={6} className="card p-5">
        <h1 className="text-center mb-4">Profile</h1>

        {userInfo ? (
          <>
            <div className="d-flex align-items-center my-2">
              <PersonFill className="me-2" size={18} />
              <div>Name: {userInfo.name}</div>
            </div>

            <div className="d-flex align-items-center my-2">
              <BiUserCircle className="me-2" size={18} />
              <div>Roles: {userInfo.roles}</div>
            </div>

            <div className="d-flex align-items-center my-2">
              <EnvelopeFill className="me-2" size={18} />
              <div>Email Address: {userInfo.email}</div>
            </div>

            <div className="d-flex align-items-center my-2">
              <LockFill className="me-2" size={18} />
              <div>Password: ********</div>
              <Button variant="warning" size="sm" className="ms-2" href="/changepassword">
                Change Password
              </Button>
            </div>

            <div className="d-flex align-items-center my-2">
              <WalletFill className="me-2" size={18} />
              <div>Ethereum Address: {userInfo.ethaddress}</div>
            </div>

            <Button
              variant="primary"
              className="mt-3 d-inline-flex align-items-center"
              style={{ width: "fit-content" }}
              href="/changeprofile"
            >
              <FaUserEdit className="me-2" size={18} />
              Change Profile
            </Button>
          </>
        ) : (
          <></>
        )}
      </Col>
    </Row>
  );
}

export default Profile;
