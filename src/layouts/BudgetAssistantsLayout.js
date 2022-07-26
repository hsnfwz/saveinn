import { Container, Row, Col } from "react-bootstrap";
import BudgetAssistantsList from "../components/BudgetAssistantsList";

function BudgetAssistantsLayout() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <BudgetAssistantsList />
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetAssistantsLayout;