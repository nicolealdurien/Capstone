import { Link } from 'react-router-dom'
import './css/App.css';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {
  MDBNavbar, MDBNavbarNav, MDBNavbarItem,
  MDBNavbarLink, MDBContainer, MDBNavbarToggler,
  MDBIcon } from 'mdb-react-ui-kit';
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
    return (
        <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/" style={{color: "#860286", fontFamily: "'Amatic SC', cursive", fontSize: '2.4rem'}} >FruVe Flow</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav"style={{border: "none"}}>
    <Nav className="mr-auto">


      <Nav.Link>
          <MDBNavbarItem>
                <Link class="nav-litem" aria-current='page' to='/'>
                    <MDBNavbarLink>Home</MDBNavbarLink>
                </Link>
            </MDBNavbarItem>
        </Nav.Link>


    <NavDropdown title="Shop" id="basic-nav-dropdown" style={{marginTop: '8px'}}>

        <NavDropdown.Item>
            <Link class="dropdown-item" to='/fruits'>
                    <MDBNavbarLink>Fruits</MDBNavbarLink>
            </Link>
        </NavDropdown.Item>

        <NavDropdown.Item>
            <Link class="dropdown-item" to='/vegetables'>
                    <MDBNavbarLink>Vegetables</MDBNavbarLink>
            </Link>
        </NavDropdown.Item>

        <NavDropdown.Item>
            <Link class="dropdown-item" to='/flowers'>
                    <MDBNavbarLink>Flowers</MDBNavbarLink>
            </Link>
        </NavDropdown.Item>

    </NavDropdown>

    <NavDropdown title="Login" id="basic-nav-dropdown" style={{marginTop: '8px'}}>

        <NavDropdown.Item>
            <Link class="dropdown-item" to='/auth/customer-login'>
                    <MDBNavbarLink>Customer</MDBNavbarLink>
            </Link>
        </NavDropdown.Item>

        <NavDropdown.Item>
            <Link class="dropdown-item" to='/auth/admin-login'>
                    <MDBNavbarLink>Admin</MDBNavbarLink>
            </Link>
        </NavDropdown.Item>

        <NavDropdown.Item>
            <Link class="dropdown-item" to='/auth/staff-login'>
                    <MDBNavbarLink>Staff</MDBNavbarLink>
            </Link>
        </NavDropdown.Item>
        
    </NavDropdown>


    <Nav.Link>
          <MDBNavbarItem>
                <Link class="nav-litem" aria-current='page' to='/auth/customer-register'>
                    <MDBNavbarLink>Register</MDBNavbarLink>
                </Link>
            </MDBNavbarItem>
        </Nav.Link>

        <Nav.Link>
          <MDBNavbarItem>
                <Link class="nav-litem" aria-current='page' to='/mycart'>
                    <MDBNavbarLink>My Cart</MDBNavbarLink>
                </Link>
            </MDBNavbarItem>
        </Nav.Link>

      
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
    )    
}

export default Navbar
