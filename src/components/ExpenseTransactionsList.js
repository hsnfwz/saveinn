import { useState, useEffect } from 'react';
import moment from 'moment';
import { Container, Row, Col, Table, Button, Modal, Form, Navbar } from 'react-bootstrap';
import { currencyFormat } from '../helpers';

function ExpenseTransactionsList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [expenseId, setExpenseId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);

  const [expenseRecords, setExpenseRecords] = useState([]);

  useEffect(() => {
    (async function() {
      await handleRefresh();
    }());
  }, []);

  async function handleRefresh() {
    try {
      const endpoint = 'http://localhost:8080/expense';

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setExpenseRecords(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd() {
    try {
      const endpoint = 'http://localhost:8080/expense';

      const body = {
        userId: undefined, // TODO: get userId from cookie
        title,
        description,
        category,
        amount,
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
      const endpoint = `http://localhost:8080/income/${expenseId}`;

      const body = {
        userId: undefined, // TODO: get userId from cookie
        title,
        description,
        category,
        amount,
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

  async function handleDelete(expenseId) {
    try {
      const endpoint = `http://localhost:8080/income/${expenseId}`;

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
    setExpenseId(0);
    setTitle('');
    setDescription('');
    setCategory('');
    setAmount(0);
    setShowAddModal(false);
    setShowEditModal(false);
  }

  return (
    <Container fluid>

      <Row>
        <Col className='d-flex justify-content-end'>
          <Button className="btn btn-secondary saveBtns my-2" onClick={() => setShowAddModal(true)}>Add Expense Transaction</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {expenseRecords.map((expenseRecord, index) => (
                <tr key={index}>
                  <td>{ expenseRecord.title }</td>
                  <td>{ expenseRecord.description }</td>
                  <td>{ expenseRecord.category }</td>
                  <td>{ currencyFormat.format(expenseRecord.amount) }</td>
                  <td>{ moment(expenseRecord.date).format('YYYY-MM-DD') }</td>
                  <td>
                    <Button className="btn btn-secondary blueBtns me-1" style={{fontWeight:"normal"}} onClick={() => {
                      setExpenseId(expenseRecord.id);
                      setTitle(expenseRecord.title);
                      setDescription(expenseRecord.description);
                      setCategory(expenseRecord.category);
                      setAmount(expenseRecord.amount);
                      setShowEditModal(true);
                    }}>
                      Edit
                    </Button>
                    <Button className="btn btn-danger" onClick={async () => await handleDelete(expenseRecord.id)}>Delete</Button>
                  </td>
                </tr>
              ))}`
            </tbody>
          </Table>
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
                New Expense Transaction
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

                <Form.Group className="mb-2">
                  <Form.Label>Category</Form.Label>
                  <Form.Control type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
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

export default ExpenseTransactionsList;