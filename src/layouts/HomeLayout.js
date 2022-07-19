import { Container, Row, Col, Button, Form, InputGroup, Navbar, Nav, NavItem } from "react-bootstrap";

function HomeLayout() {

  return (
    <Container fluid>
      <Navbar>
        <Container fluid>
          <Navbar.Brand>Save Inn</Navbar.Brand>
          <Nav>
            <Nav.Link>Product</Nav.Link>
            <Nav.Link>About Us</Nav.Link>
          </Nav>
          <Button>Sign Up</Button>
        </Container>
      </Navbar>
      <Row>
        <Col>
          <Row>
            <h2>Save more than what you spend. Welcome to the Save Inn!</h2>
          </Row>
          <Row>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique ornare gravida. Vivamus consequat nec lacus vel laoreet. </p>
          </Row>
          <Row>
            <InputGroup>
              <Form.Control type="text" placeholder="Email address"/>
              <Button>
                Sign up for Save Inn
              </Button>
            </InputGroup>
          </Row>
        </Col>
        <Col>
          Image
        </Col>
      </Row>
    </Container>
  );
}

export default HomeLayout;