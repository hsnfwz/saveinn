import { useState, useEffect } from 'react';
import moment from 'moment';
import { Container, Row, Col, Table, Button, Modal, Form, Navbar } from 'react-bootstrap';
import { currencyFormat } from '../helpers';

function IncomeTransactionsList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [incomeId, setIncomeId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);

  const [incomeRecords, setIncomeRecords] = useState([]);

  useEffect(() => {
    (async function() {
      await handleRefresh();
    }());
  }, []);

  async function handleRefresh() {
    try {
      const endpoint = 'http://localhost:8080/income';

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setIncomeRecords(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd() {
    try {
      const endpoint = 'http://localhost:8080/income';

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
      const endpoint = `http://localhost:8080/income/${incomeId}`;

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

  async function handleDelete(_incomeId) {
    try {
      const endpoint = `http://localhost:8080/income/${_incomeId}`;

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
    setIncomeId(0);
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
          <Button className="btn btn-secondary saveBtns my-2" onClick={() => setShowAddModal(true)}>Add Income Transaction</Button>
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
              {incomeRecords.map((incomeRecord, index) => (
                <tr key={index}>
                  <td>{ incomeRecord.title }</td>
                  <td>{ incomeRecord.description }</td>
                  <td>{ incomeRecord.category }</td>
                  <td>{ currencyFormat.format(incomeRecord.amount) }</td>
                  <td>{ moment(incomeRecord.date).format('YYYY-MM-DD') }</td>
                  <td>
                    <Button className="btn btn-secondary blueBtns me-1" style={{fontWeight:"normal"}} onClick={() => {
                      setIncomeId(incomeRecord.id);
                      setTitle(incomeRecord.title);
                      setDescription(incomeRecord.description);
                      setCategory(incomeRecord.category);
                      setAmount(incomeRecord.amount);
                      setShowEditModal(true);
                    }}>
                      Edit
                    </Button>
                    <Button className="btn btn-danger" onClick={async () => await handleDelete(incomeRecord.id)}>Delete</Button>
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
                New Income Transaction
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

export default IncomeTransactionsList;