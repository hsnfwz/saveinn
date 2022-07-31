import { useState, useEffect } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form, Navbar } from 'react-bootstrap';
import { currencyFormat } from '../helpers';

import saveInnLogo from "../assets/images/saveInnLogo.svg";

import '../App.css';

function BudgetGoalsList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [budgetGoalId, setBudgetGoalId] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [amountSaved, setAmountSaved] = useState(0);

  const [budgetGoalRecords, setBudgetGoalRecords] = useState([]);

  const location = useLocation();

  useEffect(() => {
    (async function() {
      await handleRefresh();
    }());
  }, []);

  async function handleRefresh() {
    try {
      const endpoint = 'http://localhost:8080/budgetGoal';

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setBudgetGoalRecords(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd() {
    const budgetPlanId = location.pathname.split('/')[2];

    try {
      const endpoint = 'http://localhost:8080/budgetGoal';

      const body = {
        userId: undefined, // TODO: get userId from cookie
        name,
        description,
        startDate,
        endDate,
        amountSaved,
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
    const budgetPlanId = location.pathname.split('/')[2];

    try {
      const endpoint = `http://localhost:8080/budgetGoal/${budgetGoalId}`;

      const body = {
        userId: undefined, // TODO: get userId from cookie
        name,
        description,
        startDate,
        endDate,
        amountSaved,
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

  async function handleDelete(_budgetGoalId) {
    try {
      const endpoint = `http://localhost:8080/budgetGoal/${_budgetGoalId}`;

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
    setBudgetGoalId(0);
    setName('');
    setDescription('');
    setStartDate(undefined);
    setEndDate(undefined);
    setAmountSaved(0);
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
              <Navbar.Text>Go back to <a href='/budget-plans'>All Plans</a></Navbar.Text>
          </Container>
        </Navbar>
      </Row>
      <Row className='px-5 mt-3'>
        <Col className=' d-flex justify-content-end'>
          <Button type="button" className="btn btn-secondary saveBtns m-2 me-5" onClick={() => setShowAddModal(true)}>Add Budget Goal</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup className='mx-5'>
            {budgetGoalRecords.map((budgetGoalRecord, index) => (
              <ListGroup.Item className='px-4 py-3 mx-5' key={index}>
                <Row className='d-flex justify-content-between flex-row'>
                  <Col>
                    <h4 className='font-weight-bold'>{ budgetGoalRecord.name }</h4>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <p className='me-2'>Start: { moment(budgetGoalRecord.startDate).format('YYYY-MM-DD') }</p>
                    <p>End: { moment(budgetGoalRecord.endDate).format('YYYY-MM-DD') }</p>
                  </Col>
                </Row>
                <p>Amount saved: { currencyFormat.format(budgetGoalRecord.amountSaved) }</p>
                <p>{ budgetGoalRecord.description }</p>
                <Button type="button" className="btn btn-secondary blueBtns m-2" style={{fontWeight:"normal"}} onClick={() => {
                  setBudgetGoalId(budgetGoalRecord.id);
                  setName(budgetGoalRecord.name);
                  setDescription(budgetGoalRecord.description);
                  setStartDate(budgetGoalRecord.startDate);
                  setEndDate(budgetGoalRecord.endDate);
                  setAmountSaved(budgetGoalRecord.amountSaved);
                  setShowEditModal(true);
                }}>
                  Edit
                </Button>
                <Button type="button" className="btn btn-danger m-2" onClick={async () => await handleDelete(budgetGoalRecord.id)}>Delete</Button>
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
                New Budget Goal
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

                <Form.Group>
                  <Form.Label>Amount Saved</Form.Label>
                  <Form.Control type="number" placeholder="Amount Saved" value={amountSaved} onChange={(e) => setAmountSaved(e.target.value)}/>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" className="btn btn-secondary saveBtns m-2" style={{fontWeight:"normal"}} onClick={() => showEditModal ? handleEdit() : handleAdd()}>{ showEditModal ? 'Edit' : 'Add'}</Button>
              <Button type="button" className="btn btn-danger m-2" onClick={() => handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetGoalsList;