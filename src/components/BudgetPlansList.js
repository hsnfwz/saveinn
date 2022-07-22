import { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form } from 'react-bootstrap';

const projectedData = [
  {
    id: 1,
    name: 'Lorem 1',
    description: 'Lorem ipsum dolor 1',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 2,
    name: 'Lorem 2',
    description: 'Lorem ipsum dolor 2',
    startDate: new Date(),
    endDate: new Date(),
  },
];

function BudgetPlansList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);

  async function handleRefresh() {
    // send request
  }

  async function handleAdd() {
    console.log('[name]:', name);
    console.log('[description]:', description);
    console.log('[startDate]:', startDate);
    console.log('[endDate]:', endDate);

    // send request

    handleClose();
    handleRefresh();
  }

  async function handleEdit() {
    console.log('[name]:', name);
    console.log('[description]:', description);
    console.log('[startDate]:', startDate);
    console.log('[endDate]:', endDate);

    // send request

    handleClose();
    handleRefresh();
  }

  async function handleDelete(projectedData) {
    console.log('[projectedData]:', projectedData);

    // send request

    handleRefresh();
  }

  function handleClose() {
    setName('');
    setDescription('');
    setStartDate(undefined);
    setEndDate(undefined);
    setShowAddModal(false);
    setShowEditModal(false);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Button onClick={() => setShowAddModal(true)}>Add Budget Plan</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {projectedData.map((projectedData, index) => (
              <ListGroup.Item key={index}>
                <h4>{ projectedData.name }</h4>
                <p>{ projectedData.description }</p>
                <p>Start: { moment(projectedData.startDate).format('YYYY-MM-DD') }</p>
                <p>End: { moment(projectedData.endDate).format('YYYY-MM-DD') }</p>
                <Link to={`/budget-plans/${projectedData.id}`}>View</Link>
                <Button onClick={() => {
                  setName(projectedData.name);
                  setDescription(projectedData.description);
                  setStartDate(projectedData.startDate);
                  setEndDate(projectedData.endDate);
                  setShowEditModal(true);
                }}>
                  Edit
                </Button>
                <Button onClick={async () => await handleDelete(projectedData)}>Delete</Button>
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
                Budget Plan
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" onChange={(e) => setStartDate(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" onChange={(e) => setEndDate(e.target.value)} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={async () => await handleClose()}>Close</Button>
              <Button onClick={() => showEditModal ? handleEdit() : handleAdd()}>{ showEditModal ? 'Edit' : 'Add'}</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetPlansList;