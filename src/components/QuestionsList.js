import { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form } from 'react-bootstrap';

const projectedData = [
  {
    id: 1,
    title: 'Lorem ipsum dolor 1?',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Lorem ipsum dolor sit amet consectetur adipiscing. In aliquam sem fringilla ut morbi tincidunt augue interdum velit. Morbi tristique senectus et netus et malesuada.',
    date: new Date(),
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor 2?',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Lorem ipsum dolor sit amet consectetur adipiscing. In aliquam sem fringilla ut morbi tincidunt augue interdum velit. Morbi tristique senectus et netus et malesuada.',
    date: new Date(),
  },
];

function QuestionsList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handleRefresh() {
    // get table records
  }

  async function handleAdd() {
    console.log('[title]:', title);
    console.log('[description]:', description);

    // send request

    handleClose();
    handleRefresh();
  }

  async function handleEdit() {
    console.log('[title]:', title);
    console.log('[description]:', description);

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
    setTitle('');
    setDescription('');
    setShowAddModal(false);
    setShowEditModal(false);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Button onClick={() => setShowAddModal(true)}>Ask Question</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {projectedData.map((projectedData, index) => (
              <ListGroup.Item key={index}>
                <h4>{ projectedData.title }</h4>
                <p>{ projectedData.description }</p>
                <p>{ moment(projectedData.date).format('YYYY-MM-DD') }</p>
                <Link to={`/questions/${projectedData.id}`}>View</Link>
                <Button onClick={() => {
                  setTitle(projectedData.title);
                  setDescription(projectedData.description);
                  setShowEditModal(true);
                }}>Edit</Button>
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
                Ask Question
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
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

export default QuestionsList;