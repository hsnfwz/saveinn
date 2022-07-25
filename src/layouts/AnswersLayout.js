import { Container, Row, Col } from "react-bootstrap";
import AnswersList from '../components/AnswersList';

function AnswersLayout() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <AnswersList />
        </Col>
      </Row>
    </Container>
  );
}

export default AnswersLayout;