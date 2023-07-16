import "../App.css";
import "../style/navbar.css"

import { Container, Navbar, Nav } from "react-bootstrap";
import { DoorOpenFill, DoorClosedFill } from 'react-bootstrap-icons';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';


function Navbarz() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary navbar-shadow">
        <Container>
        <Navbar.Brand className="navbar-brand">Private <span>EMR</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/pasien">Pasien</Nav.Link>
              <Nav.Link href="/tenaga">Tenaga</Nav.Link>
              <Nav.Link href="/upload">Upload</Nav.Link>
              <Nav.Link href="/documents">Documents</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link href="/login"><FaSignInAlt className="me-2" size={18} />Log In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbarz;
