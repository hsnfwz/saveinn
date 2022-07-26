import { Container, Row, Col } from "react-bootstrap";
import BudgetMembersList from "../components/BudgetMembersList";

function BudgetMembersLayout() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <BudgetMembersList />
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetMembersLayout;