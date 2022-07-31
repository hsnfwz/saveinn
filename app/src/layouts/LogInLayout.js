import { Container, Row, Col } from "react-bootstrap";
import LogInList from "./components/LogInList";

function LogInLayout(){
    return(
        <Container fluid>
            <Col>
                <Row>
                    <LogInList/>
                </Row>
            </Col>
        </Container>
    )
}

export default LogInLayout