import { useState, useEffect } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form, Navbar } from 'react-bootstrap';

import saveInnLogo from "../layouts/images/saveInnLogo.svg";

import '../App.css';

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

function AnswersList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const location = useLocation();
  
  useEffect(() => {
    (async function() {
      console.log('[location]:', location);

      // send request
    }());
  }, []);

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
      <Navbar className="d-flex justify-content-between pt-4">
        <Container fluid>
            <Navbar.Brand className="brandLogo d-flex align-items-center" style={{color: "#63D3A9"}} href="/dashboard">
                <img 
                src= {saveInnLogo}
                width="50"
                height="50"
                className="d-inline-block align-top mx-2"
                alt="Save Inn logo"/>
            Save Inn</Navbar.Brand>
        </Container>
        <Container fluid className="d-flex justify-content-end">
            <Navbar.Text>Go back to <a href='/questions'>All Questions</a></Navbar.Text>
        </Container>
      </Navbar>
      <Row className='px-5 mt-3'>
        <Col className=' d-flex justify-content-end'>
          <Button className="btn btn-secondary saveBtns m-2" onClick={() => setShowAddModal(true)}>Answer Question</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup className='mx-5'>
            {projectedData.map((projectedData, index) => (
              <ListGroup.Item className='px-4 py-3 mx-5' key={index}>
                <Row className='d-flex justify-content-between flex-row'>
                  <Col>
                    <h4 className='font-weight-bold'>{ projectedData.title }</h4>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <p>{ moment(projectedData.date).format('YYYY-MM-DD') }</p>
                  </Col>
                </Row>
                <p>{ projectedData.description }</p>
                <Button className="btn btn-secondary blueBtns m-2 me-5" style={{fontWeight:"normal"}} onClick={() => {
                  setTitle(projectedData.title);
                  setDescription(projectedData.description);
                  setShowEditModal(true);
                }}>Edit</Button>
                <Button className="btn btn-danger m-2" onClick={async () => await handleDelete(projectedData)}>Delete</Button>
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
                Answer Question
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
              <Button className="btn btn-secondary saveBtns m-2" style={{fontWeight:"normal"}} onClick={() => showEditModal ? handleEdit() : handleAdd()}>{ showEditModal ? 'Edit' : 'Answer'}</Button>
              <Button className="btn btn-danger m-2" onClick={async () => await handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default AnswersList;