import { Container, Row, Col } from "react-bootstrap";
import IncomeTransactionsList from "../components/IncomeTransactionsList";

function IncomeTransactionsLayout() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <IncomeTransactionsList />
        </Col>
      </Row>
    </Container>
  );
}

export default IncomeTransactionsLayout;