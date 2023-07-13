import "../App.css";

import { Container, Navbar, Nav } from "react-bootstrap";

function Navbarz() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Private EMR</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/pasien">Pasien</Nav.Link>
              <Nav.Link href="/tenaga">Tenaga</Nav.Link>
              <Nav.Link href="/upload">Upload</Nav.Link>
              <Nav.Link href="/documents">Documents</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbarz;
