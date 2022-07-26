import { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form, Navbar } from 'react-bootstrap';

import saveInnLogo from "../layouts/images/saveInnLogo.svg";
import planIcon from "../layouts/images/plan.svg";

import '../App.css';

const projectedData = [
  {
    id: 1,
    name: 'Lorem 1',
    description: 'Lorem ipsum dolor 1',
    startDate: new Date(),
    endDate: new Date(),
    duration: undefined,
  },
  {
    id: 2,
    name: 'Lorem 2',
    description: 'Lorem ipsum dolor 2',
    startDate: new Date(),
    endDate: new Date(),
    duration: undefined,
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
              <Button className="btn btn-secondary saveBtns m-2" onClick={() => setShowAddModal(true)}>New Plan</Button>
          </Container>
        </Navbar>
      </Row>
      <Row className='px-5 mt-3 d-flex justify-content-center'>
        <img 
          src= {planIcon}
          width="250"
          height="250"
          alt="Plan Icon"/>
        <h2 className='d-flex justify-content-center mt-3 mb-5'>My Plans</h2>
      </Row>
      <Row>
        <Col>
          <ListGroup className='mx-5'>
            {projectedData.map((projectedData, index) => (
              <ListGroup.Item className='px-4 py-3 mx-5' key={index}>
                <Row className='d-flex justify-content-between flex-row'>
                  <Col>
                    <h4 className='font-weight-bold'>{ projectedData.name }</h4>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <p className='me-2'>Start: { moment(projectedData.startDate).format('YYYY-MM-DD') }</p>
                    <p>End: { moment(projectedData.endDate).format('YYYY-MM-DD') }</p>
                  </Col>
                </Row>
                <p>{ projectedData.description }</p>
                <Row>
                  <Col>
                    <Button className="btn btn-secondary blueBtns m-2" style={{fontWeight:"normal"}} onClick={() => {
                      setName(projectedData.name);
                      setDescription(projectedData.description);
                      setStartDate(projectedData.startDate);
                      setEndDate(projectedData.endDate);
                      setShowEditModal(true);
                    }}>Edit</Button>
                    <Button className="btn btn-danger m-2" onClick={async () => await handleDelete(projectedData)}>Delete</Button>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <Link className='' to={`/budget-plans/${projectedData.id}`}>View</Link>
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
                New Budget Plan
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
              <Button className="btn btn-secondary saveBtns m-2" style={{fontWeight:"normal"}} onClick={() => showEditModal ? handleEdit() : handleAdd()}>{ showEditModal ? 'Edit' : 'Add'}</Button>
              <Button className="btn btn-danger m-2" onClick={async () => await handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetPlansList;