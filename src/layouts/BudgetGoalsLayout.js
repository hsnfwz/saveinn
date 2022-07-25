import { Container, Row, Col } from "react-bootstrap";
import BudgetGoalsList from '../components/BudgetGoalsList';

function BudgetGoalsLayout() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <BudgetGoalsList />
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetGoalsLayout;