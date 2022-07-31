import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form, Navbar } from 'react-bootstrap';

import saveInnLogo from "../assets/images/saveInnLogo.svg";
import userIcon from "../assets/images/userIcon.svg";

import '../App.css';

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
        <Navbar className="d-flex justify-content-between pt-4" style={{backgroundColor:"#ffffff"}}>
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
              <Navbar.Text>Know of new savers?</Navbar.Text>
              <Button type="button" className="btn btn-secondary saveBtns m-2" onClick={() => setShowAddModal(true)}>Add Group Member</Button>
          </Container>
        </Navbar>
      </Row>
      <Row className='mx-5 mt-3 px-5'>
        <Col>
          <h1>Group Members</h1>
        </Col>
        <Col className='d-flex justify-content-end align-items-end'>
          <Link to={`/groups`}>Go back to Groups</Link>
        </Col>
      </Row>
      <Row className='mx-5 mt-3 px-5'>
        <Col>
          <ListGroup>
            {projectedData.map((projectedData, index) => (
              <ListGroup.Item key={index}>
                <Row className='d-flex align-items-center'>
                  <Col md="auto">
                    <img
                    src= {userIcon}
                    width="50"
                    height="50"
                    className="mx-2"
                    alt="Save Inn logo"
                    />
                  </Col>
                  <Col className='d-flex flex-row align-items-center pt-2'>
                    <h6 className='me-1'>{ projectedData.firstName }</h6>
                    <h6>{ projectedData.lastName }</h6>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <Button type="button" onClick={async () => await handleDelete(projectedData)}>Delete</Button>
                  </Col>
                </Row>
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
                Add Group Member
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
              <Button type="button" className="btn btn-secondary saveBtns m-2" style={{fontWeight:"normal"}} onClick={() => showEditModal ? handleEdit() : handleAdd()}>{ showEditModal ? 'Edit' : 'Add'}</Button>
              <Button type="button" className="btn btn-danger m-2" onClick={async () => await handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default GroupMembersList;