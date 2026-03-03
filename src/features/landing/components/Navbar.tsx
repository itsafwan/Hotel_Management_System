// ResponsiveAppBar.tsx
import { Navbar, Container, Nav } from "react-bootstrap";
import {  Link as RouterLink } from "react-router-dom";
import Button from "../../../components/common/Button";
import logo from "../../../assets/images/logo.gif";
import "../../../assets/styles/global.css";

function ResponsiveAppBar() {
  return (
    <Navbar expand="lg" className="navbar-custom-bg navbar-light sticky-top">
      <Container fluid>
         <Navbar.Brand href="/Home">
            <img
              src={logo}
              alt="Hotel  Logo"
              style={{ 
              height: "80px",      
              width: "auto",
              objectFit: "contain",
            }}
              className="d-inline-block align-top me-2"
            />
          </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={RouterLink} to="/Home"  className=" mt-1">
              Home
            </Nav.Link>
          
            
            <Nav.Link as={RouterLink} to="/About"  className=" mt-1 ">About</Nav.Link>
            <Nav.Link as={RouterLink} to="/Gallery"  className=" mt-1 ">Gallery</Nav.Link>
            <Nav.Link as={RouterLink} to="/Contact"  className=" mt-1 ">Contact</Nav.Link>
          </Nav>

        
          
          <div className="d-flex">
            <RouterLink to="/signin" >
              <Button className="btn-primary">Login</Button>
            </RouterLink>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default ResponsiveAppBar;