import { Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
//Images
import saveInnLogo from "./images/saveInnLogo.svg";
import piggyBank from "./images/manPiggyBank.svg";
import backgroundImage from "./images/landingBackground.png"
//css
import '../App.css';

function HomeLayout() {

  return (
    <Container fluid className="px-5" style={{height: "100vh", backgroundImage : `url(${backgroundImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition:"center"}}>
      <Navbar className="p-4 mb-5">
        <Container className="d-flex justify-content-start">
          <Navbar.Brand className="brandLogo d-flex align-items-center" style={{color: "#63D3A9"}}>
            <img 
              src= {saveInnLogo}
              width="50"
              height="50"
              className="d-inline-block align-top mx-2"
              alt="Save Inn logo"/>
            Save Inn</Navbar.Brand>
          <Nav xs={6}>
            <Nav.Link>Product</Nav.Link>
            <Nav.Link>About Us</Nav.Link>
          </Nav>
        </Container>
        <Container className="d-flex justify-content-end">
          <Button type="button" className="btn btn-light saveBtns px-5">Log In</Button>
        </Container>
      </Navbar>
      <Row className="d-flex align-items-center px-2" style={{ height: "60vh"}}>
        <Col className="px-5">
          <Row className="pb-2">
            <h1 style={{fontWeight: "bold"}}>Save more than what you spend. Welcome to the Save Inn!</h1>
          </Row>
          <Row className="py-2">
            <h4 className="text-muted">The budget manager platform to build a community, save together, and enjoy more worry-free years.</h4>
          </Row>
          <Row className="pt-2">
            <InputGroup>
              <Form.Control type="text" placeholder="Email address"/>
              <Button type="button" className="btn btn-light saveBtns">
                Sign up for Save Inn
              </Button>
            </InputGroup>
          </Row>
        </Col>
        <Col className="d-flex justify-content-center">
          <img 
            src= {piggyBank}
            alt="Man riding piggy bank"
            width="400"
            height="320"
            />
        </Col>
      </Row>
    </Container>
  );
}

export default HomeLayout;