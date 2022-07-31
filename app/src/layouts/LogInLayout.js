import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// context
import { AuthContext } from '../context/AuthContext';

// components
import LogInInfo from '../components/LogInInfo';

function LogInLayout() {
    const auth = useContext(AuthContext);

    return(
        <>
            {!auth.user && (
                <Container fluid>
                    <Col>
                        <Row>
                            <LogInInfo/>
                        </Row>
                    </Col>
                </Container>
            )}

            {auth.user && (
                <Navigate to="/dashboard" /> 
            )}
        </>
    )
}

export default LogInLayout;
