import { Container, Row, Col } from "react-bootstrap";
import IncomeTransactionsList from "../components/IncomeTransactionsList";
import ExpenseTransactionsList from "../components/ExpenseTransactionsList";
import DashboardList from "../components/DashboardList";

function DashboardLayout() {

  return (
    <Container fluid>
      <Row>
        <DashboardList/>
      </Row>
      <Row className="px-4">
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