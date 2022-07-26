import { Container, Row, Col } from "react-bootstrap";
import UserAccountInfo from "../components/UserAccountInfo";

function BudgetMemberLayout() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <UserAccountInfo />
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetMemberLayout;