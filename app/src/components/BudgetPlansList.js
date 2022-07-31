import { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form, Navbar } from 'react-bootstrap';

import saveInnLogo from "../assets/images/saveInnLogo.svg";
import planIcon from "../assets/images/plan.svg";

import '../App.css';

function BudgetPlansList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [budgetPlanId, setBudgetPlanId] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);

  const [budgetPlanRecords, setBudgetPlanRecords] = useState([]);

  useEffect(() => {
    (async function() {
      await handleRefresh();
    }());
  }, []);

  async function handleRefresh() {
    try {
      const endpoint = 'http://localhost:8080/budgetPlan';

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setBudgetPlanRecords(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd() {
    try {
      const endpoint = 'http://localhost:8080/budgetPlan';

      const body = {
        userId: undefined, // TODO: get userId from cookie
        name,
        description,
        startDate,
        endDate,
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      handleClose();
      await handleRefresh();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit() {
    try {
      const endpoint = `http://localhost:8080/budgetPlan/${budgetPlanId}`;

      const body = {
        userId: undefined, // TODO: get userId from cookie
        name,
        description,
        startDate,
        endDate,
      }

      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      handleClose();
      await handleRefresh();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(_budgetPlanId) {
    try {
      const endpoint = `http://localhost:8080/budgetPlan/${_budgetPlanId}`;

      const options = {
        method: 'DELETE',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      await handleRefresh();
    } catch (error) {
      console.log(error);
    }
  }

  function handleClose() {
    setBudgetPlanId(0);
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
            {budgetPlanRecords.map((budgetPlanRecord, index) => (
              <ListGroup.Item className='px-4 py-3 mx-5' key={index}>
                <Row className='d-flex justify-content-between flex-row'>
                  <Col>
                    <h4 className='font-weight-bold'>{ budgetPlanRecord.name }</h4>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <p className='me-2'>Start: { moment(budgetPlanRecord.startDate).format('YYYY-MM-DD') }</p>
                    <p>End: { moment(budgetPlanRecord.endDate).format('YYYY-MM-DD') }</p>
                  </Col>
                </Row>
                <p>{ budgetPlanRecord.description }</p>
                <Row>
                  <Col>
                    <Button className="btn btn-secondary blueBtns m-2" style={{fontWeight:"normal"}} onClick={() => {
                      setBudgetPlanId(budgetPlanRecord.id);
                      setName(budgetPlanRecord.name);
                      setDescription(budgetPlanRecord.description);
                      setStartDate(budgetPlanRecord.startDate);
                      setEndDate(budgetPlanRecord.endDate);
                      setShowEditModal(true);
                    }}>Edit</Button>
                    <Button className="btn btn-danger m-2" onClick={async () => await handleDelete(budgetPlanRecord.id)}>Delete</Button>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <Link className='' to={`/budget-plans/${budgetPlanRecord.id}`}>View</Link>
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
              <Button className="btn btn-danger m-2" onClick={() => handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetPlansList;