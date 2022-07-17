import { Container, Row, Col, Button } from "react-bootstrap";

// helpers
import { getAllTableRecords, getTableRecordById, insertTableRecord, updateTableRecordById, deleteTableRecordById } from '../helpers';

function HomeLayout() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Button onClick={async () => await getAllTableRecords('get-req')}>GET</Button>
          <Button onClick={async () => await getTableRecordById('get-req', '123')}>GET ID</Button>
          <Button onClick={async () => await insertTableRecord('post-req', { name: 'john' })}>POST</Button>
          <Button onClick={async () => await updateTableRecordById('put-req', '123', { name: 'sarah' })}>PUT</Button>
          <Button onClick={async () => await deleteTableRecordById('delete-req', '123')}>DELETE</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeLayout;