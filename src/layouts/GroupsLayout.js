import { Container, Row, Col } from "react-bootstrap";
import GroupsList from "../components/GroupsList";

function GroupsLayout() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <GroupsList />
        </Col>
      </Row>
    </Container>
  );
}

export default GroupsLayout;