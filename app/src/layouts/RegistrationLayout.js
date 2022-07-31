import { Container, Row, Col} from "react-bootstrap";
import SignUpInfo from "../components/SignUpInfo";

function RegistrationLayout() {
    return(
        <Container fluid>
            <Col>
                <Row>
                    <SignUpInfo/>
                </Row>
            </Col>
        </Container>
    )
}

export default RegistrationLayout