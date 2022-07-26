import { useState } from 'react';
import { Container, Row, Col, ListGroup, Button, Modal, Form } from 'react-bootstrap';

const projectedData = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
};

function UserAccountInfo() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  async function handleRefresh() {
    // send request
  }

  async function handleEdit() {
    console.log('[firstName]', firstName);
    console.log('[lastName]', lastName);
    
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
    setShowEditModal(false);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>User Account</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            <ListGroup.Item>
              <p>{ projectedData.firstName }</p>
              <p>{ projectedData.lastName }</p>
              <Button type="button" onClick={async () => await handleDelete(projectedData)}>Delete Account</Button>
              <Button type="button" onClick={async () => {
                setFirstName(projectedData.firstName);
                setLastName(projectedData.lastName);
                setShowEditModal(true);
              }}>Edit Account</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Modal
            size="lg"
            centered
            show={showEditModal}
            onHide={() => handleClose()}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                User Account
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" onClick={async () => await handleClose()}>Close</Button>
              <Button type="button" onClick={() => handleEdit()}>Edit</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default UserAccountInfo;