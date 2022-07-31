import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// context
import { AuthContext } from '../context/AuthContext';

// components
import IncomeTransactionsList from '../components/IncomeTransactionsList';
import ExpenseTransactionsList from '../components/ExpenseTransactionsList';
import DashboardInfo from '../components/DashboardInfo';

function DashboardLayout() {
  const auth = useContext(AuthContext);

  return (
    <>
        {auth.user && ( 
          <Container fluid>
            <Row>
              <Col>
                <DashboardInfo/>
              </Col>
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
        )}

        {!auth.user && (
          <Navigate to="/log-in" />
        )}
    </>
  );
}

export default DashboardLayout;
