// ResponsiveAppBar.tsx
import { Navbar, Container, Nav,  } from 'react-bootstrap';

function ResponsiveAppBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        
        <Navbar.Brand href="#">Navbar</Navbar.Brand>
        {/* Logo/Image yahan daal do
        <Navbar.Brand href="/">
          <img
            src={hotelLogo}                 yahan apna image path ya URL
            alt="Hotel Management Logo"
            width="40"                     size adjust karo (width + height dono ya sirf ek)
            height="40"
            className="d-inline-block align-top me-2"   align-top se text ke saath sahi fit hota hai
          />
          { Optional: Image ke saath text bhi rakh sakte ho }
          { Hotel Management }
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link active>Home</Nav.Link>
            <Nav.Link>Link</Nav.Link>
            <Nav.Link >Disabled</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default ResponsiveAppBar;
