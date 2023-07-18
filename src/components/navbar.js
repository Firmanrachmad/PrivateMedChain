import "../App.css";
import "../style/navbar.css";

import { Container, Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { DoorOpenFill, DoorClosedFill } from "react-bootstrap-icons";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

function Navbarz() {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const hasRole = (role) => userInfo?.roles?.includes(role);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary navbar-shadow">
        <Container>
          <Navbar.Brand className="navbar-brand">
            Private <span>EMR</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              {/* Tampilkan Home untuk semua pengguna */}

              {userInfo && <Nav.Link href="/">Home</Nav.Link>}

              {/* Tampilkan Pasien dan Tenaga hanya untuk peran PRK */}

              {hasRole("PRK") && (
                <>
                  <Nav.Link href="/pasien">Pasien</Nav.Link>
                  <Nav.Link href="/tenaga">Tenaga</Nav.Link>
                </>
              )}

              {/* Tampilkan Upload hanya untuk peran TK */}

              {hasRole("TK") && <Nav.Link href="/upload">Upload</Nav.Link>}

              {/* Tampilkan Documents hanya jika pengguna telah login */}

              {userInfo && <Nav.Link href="/documents">Documents</Nav.Link>}
            </Nav>
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="name">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>

                  {/* Tampilkan Log In hanya jika pengguna belum login */}
                  
                  <Nav.Link href="/login">
                    <FaSignInAlt className="me-2" size={18} />
                    Log In
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbarz;
