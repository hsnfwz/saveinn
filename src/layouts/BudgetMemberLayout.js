import { Container, Row, Col } from "react-bootstrap";
import BudgetMemberAccountInfo from '../components/BudgetMemberAccountInfo';

function BudgetMemberLayout() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <BudgetMemberAccountInfo />
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetMemberLayout;