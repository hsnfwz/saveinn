import { Container, Row, Col } from "react-bootstrap";
import QuestionsList from "../components/QuestionsList";

function QuestionsLayout() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <QuestionsList />
        </Col>
      </Row>
    </Container>
  );
}

export default QuestionsLayout;