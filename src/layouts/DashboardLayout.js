import { Container, Row, Col } from "react-bootstrap";
import IncomeTransactionsList from "../components/IncomeTransactionsList";
import ExpenseTransactionsList from "../components/ExpenseTransactionsList";

function DashboardLayout() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <IncomeTransactionsList />
        </Col>
        <Col>
          <ExpenseTransactionsList />
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardLayout;