import { Container, Row, Col } from "react-bootstrap";
import HomeList from "./components/HomeList";

function HomeLayout(){
  return(
    <Container fluid>
      <Col>
        <Row>
          <HomeList></HomeList>
        </Row>
      </Col>
    </Container>
  )
}
export default HomeLayout;