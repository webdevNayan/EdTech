import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { signOutUser } from '../../redux/userSlice';

import Swal from 'sweetalert2';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  const logoutHandler = () => {
    dispatch(signOutUser());
    Swal.fire("You can signin again anytime");
    navigate('/signin'); // Redirect to the signin page after sign out
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="justify-content-between">
      <Container>
        <Link to="/">
          <Navbar.Brand><b> EDTECH</b></Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/user_dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin_auth">
              <small className='text-secondary'>Admin </small>
            </Nav.Link>
            {/* Add more Nav.Link for additional routes */}
          </Nav>
        </Navbar.Collapse>
        <Button variant="danger" onClick={logoutHandler}>Logout</Button>
      </Container>
    </Navbar>
  );
};

export default Header;
