import { Container, Row, Col } from "react-bootstrap";
import IncomeTransactionsList from "../components/IncomeTransactionsList";
import ExpenseTransactionsList from "../components/ExpenseTransactionsList";
import DashboardInfo from "../components/DashboardInfo";

function DashboardLayout() {

  return (
    <Container fluid>
      <Row>
        <DashboardInfo/>
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