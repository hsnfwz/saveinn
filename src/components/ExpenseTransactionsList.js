import { useState } from 'react';
import moment from 'moment';
import { Container, Row, Col, Table, Button, Modal, Form, Navbar } from 'react-bootstrap';
import { currencyFormat } from '../helpers';

const projectedData = [
  {
    id: 1,
    amount: 1000,
    title: 'Lorem 1',
    description: 'Lorem ipsum dolor 1',
    category: 'Category 1',
    date: new Date(),
  },
  {
    id: 2,
    amount: 50.25,
    title: 'Lorem 2',
    description: 'Lorem ipsum dolor 1',
    category: 'Category 2',
    date: new Date(),
  },
];

function ExpenseTransactionsList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);

  async function handleRefresh() {
    // send request
  }

  async function handleAdd() {
    console.log('[title]:', title);
    console.log('[description]:', description);
    console.log('[category]:', category);
    console.log('[amount]:', amount);

    // send request

    handleClose();
    handleRefresh();
  }

  async function handleEdit() {
    console.log('[title]:', title);
    console.log('[description]:', description);
    console.log('[category]:', category);
    console.log('[amount]:', amount);

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
              {projectedData.map((projectedData, index) => (
                <tr key={index}>
                  <td>{ projectedData.title }</td>
                  <td>{ projectedData.description }</td>
                  <td>{ projectedData.category }</td>
                  <td>{ currencyFormat.format(projectedData.amount) }</td>
                  <td>{ moment(projectedData.date).format('YYYY-MM-DD') }</td>
                  <td>
                    <Button className="btn btn-secondary blueBtns me-2" style={{fontWeight:"normal"}} onClick={() => {
                      setTitle(projectedData.title);
                      setDescription(projectedData.description);
                      setCategory(projectedData.category);
                      setAmount(projectedData.amount);
                      setShowEditModal(true);
                    }}>
                      Edit
                    </Button>
                    <Button className="btn btn-danger" onClick={async () => await handleDelete(projectedData)}>Delete</Button>
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
              <Button className="btn btn-danger m-2" onClick={async () => await handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default ExpenseTransactionsList;