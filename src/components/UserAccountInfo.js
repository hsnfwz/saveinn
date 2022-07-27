import { useState } from 'react';
import { Container, Row, Col, ListGroup, Button, Modal, Form, Navbar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import saveInnLogo from "../layouts/images/saveInnLogo.svg";
import userIcon from "../layouts/images/userIcon.svg";

import '../App.css';

const projectedData = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
};

function UserAccountInfo() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  let navigate = useNavigate();

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
    <Container fluid style={{height:"100vh"}}>
      <Row>
        <Navbar className="d-flex justify-content-between py-4" style={{backgroundColor:"#ffffff"}}>
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
            <Button className="btn btn-secondary saveBtns px-5" onClick={() => navigate("/")}>Log Out</Button>
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Row>
          <Col className='d-flex align-items-center justify-content-center pt-2'>
            <h2>User Account</h2>
          </Col>
        </Row>
        <Row>
          <Col className='d-flex align-items-center justify-content-center pt-2'>
            <img
            src= {userIcon}
            width="100"
            height="100"
            className="mx-2"
            alt="Save Inn logo"
            />
          </Col>
        </Row>
        <Row>
          <Col className='d-flex align-items-center justify-content-center py-2'>
            <h3 className='me-1'>{ projectedData.firstName }</h3>
            <h3>{ projectedData.lastName }</h3>
          </Col>
        </Row>
        <Row>
          <Col className='d-flex justify-content-center mt-2'>
            <Button className="btn btn-secondary blueBtns mx-2" style={{fontWeight:"normal"}} onClick={async () => {
              setFirstName(projectedData.firstName);
              setLastName(projectedData.lastName);
              setShowEditModal(true);
            }}>Edit Account</Button>
            <Button className="btn btn-danger mx-2" onClick={async () => await handleDelete(projectedData)}>Delete Account</Button>
          </Col>
        </Row>
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
                Edit Account
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
              <Button className="btn btn-secondary saveBtns m-2" style={{fontWeight:"normal"}} onClick={() => handleEdit()}>Edit</Button>
              <Button className="btn btn-danger m-2" onClick={async () => await handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default UserAccountInfo;