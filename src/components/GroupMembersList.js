import { useState } from 'react';
import { Container, Row, Col, ListGroup, Button, Modal, Form } from 'react-bootstrap';

const projectedData = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    id: 2,
    firstName: 'Sarah',
    lastName: 'Shaw',
  },
];

function GroupMembersList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [fullName, setFullName] = useState('');

  async function handleRefresh() {
    // send request
  }

  async function handleAdd() {
    console.log('fullName', fullName);

    // send request

    handleClose();
    handleRefresh();
  }

  async function handleEdit() {

    // send request

    handleClose();
    handleRefresh();
  }

  async function handleDelete(projectedData) {
    console.log(projectedData);

    // send request

    handleRefresh();
  }

  function handleClose() {
    setShowAddModal(false);
    setShowEditModal(false);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Group Members</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button type="button" onClick={() => setShowAddModal(true)}>Add Group Member</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {projectedData.map((projectedData, index) => (
              <ListGroup.Item key={index}>
                <p>{ projectedData.firstName }</p>
                <p>{ projectedData.lastName }</p>
                <Button type="button" onClick={async () => await handleDelete(projectedData)}>Delete</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Modal
            size="lg"
            centered
            show={showEditModal ? showEditModal : showAddModal}
            onHide={() => handleClose()}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Group Member
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" onClick={async () => await handleClose()}>Close</Button>
              <Button type="button" onClick={() => showEditModal ? handleEdit() : handleAdd()}>{ showEditModal ? 'Edit' : 'Add'}</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default GroupMembersList;