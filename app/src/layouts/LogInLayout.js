import { Container, Row, Col } from "react-bootstrap";
import LogInInfo from "../components/LogInInfo";

function LogInLayout(){
    return(
        <Container fluid>
            <Col>
                <Row>
                    <LogInInfo/>
                </Row>
            </Col>
        </Container>
    )
}

export default LogInLayout