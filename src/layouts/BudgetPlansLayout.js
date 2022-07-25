import { Container, Row, Col } from "react-bootstrap";
import BudgetPlansList from "../components/BudgetPlansList";

function BudgetPlansLayout() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <BudgetPlansList />
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetPlansLayout;