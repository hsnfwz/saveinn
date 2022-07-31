import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';

// context
import { AuthContext } from '../context/AuthContext';

// components
import SignUpInfo from '../components/SignUpInfo';

function RegistrationLayout() {
    const auth = useContext(AuthContext);

    return (
        <>
            {auth.user && (
                <Navigate to="/dashboard" />
            )}

            {!auth.user && (
                <Container fluid>
                    <Col>
                        <Row>
                            <SignUpInfo/>
                        </Row>
                    </Col>
                </Container>
            )}
        </>
    );
}

export default RegistrationLayout;
