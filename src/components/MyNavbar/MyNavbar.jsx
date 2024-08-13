import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MyNavbar() {
  return (
    <Navbar expand="lg" className="bg-secondary">
      <Container>
        <Navbar.Brand as={Link} to='/'>
            <img
              src="../../../public/vite.svg"
              className="d-inline-block align-top bg-white"
              alt="logo"
              style={{ borderRadius: '50%', height:'40px',  width:'60px' }}
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/data'>Data Visualization</Nav.Link>
            <Nav.Link as={Link} to='/history'>Historical Data</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to='/predict'>Crop Prediction</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/track' >Animal Tracking & Sensors</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;