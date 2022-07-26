import { Container, Row, Col } from "react-bootstrap";
import GroupMembersList from "../components/GroupMembersList";

function GroupLayout() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <GroupMembersList />
        </Col>
      </Row>
    </Container>
  );
}

export default GroupLayout;