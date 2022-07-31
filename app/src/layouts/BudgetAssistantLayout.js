import { Container, Row, Col } from "react-bootstrap";
import BudgetAssistantAccountInfo from '../components/BudgetAssistantAccountInfo';

function BudgetAssistantLayout() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <BudgetAssistantAccountInfo />
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetAssistantLayout;