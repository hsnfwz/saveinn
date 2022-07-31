import { Container, Row, Col } from "react-bootstrap";
import ExpenseTransactionsList from "../components/ExpenseTransactionsList";

function ExpenseTransactionsLayout() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <ExpenseTransactionsList />
        </Col>
      </Row>
    </Container>
  );
}

export default ExpenseTransactionsLayout;