import { Container, Row, Col} from "react-bootstrap";
import RegistrationList from "./components/RegistrationList";



function RegistrationLayout(){


    return(
        <Container fluid>
            <Col>
                <Row>
                    <RegistrationList/>
                </Row>
            </Col>
        </Container>
    )
}

export default RegistrationLayout