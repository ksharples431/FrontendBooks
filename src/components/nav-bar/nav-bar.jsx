import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './nav-bar.scss';

export const NavBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          My Books
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {!user && (
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {!user && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            {user && (
              <Nav.Link as={Link} to="/profile">
                My Profile
              </Nav.Link>
            )}
            {user && (
              <Nav.Link onClick={onLoggedOut} className="logoutBtn">
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
