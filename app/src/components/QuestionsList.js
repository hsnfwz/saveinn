import { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form, Navbar, Figure } from 'react-bootstrap';

import saveInnLogo from "../assets/images/saveInnLogo.svg";
import questionsIcon from "../assets/images/faqIcon.svg";

import '../App.css';

function QuestionsList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [questionId, setQuestionId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [questionRecords, setQuestionRecords] = useState([]);

  useEffect(() => {
    (async function() {
      await handleRefresh();
    }());
  }, []);

  async function handleRefresh() {
    try {
      const endpoint = 'http://localhost:8080/question';

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setQuestionRecords(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd() {
    try {
      const endpoint = 'http://localhost:8080/question';

      const body = {
        userId: undefined, // TODO: get userId from cookie
        title,
        description,
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
      const endpoint = `http://localhost:8080/question/${questionId}`;

      const body = {
        userId: undefined, // TODO: get userId from cookie
        title,
        description,
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

  async function handleDelete(_questionId) {
    try {
      const endpoint = `http://localhost:8080/question/${_questionId}`;

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
    setQuestionId(0);
    setTitle('');
    setDescription('');
    setShowAddModal(false);
    setShowEditModal(false);
  }

  return (
    <Container fluid >
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
              <Navbar.Text>Have a question?</Navbar.Text>
              <Button className="btn btn-secondary saveBtns m-2" onClick={() => setShowAddModal(true)}>Ask Question</Button>
          </Container>
        </Navbar>
      </Row>
      <Row className='px-5 mt-3 d-flex justify-content-center'>
        <img 
          src= {questionsIcon}
          width="200"
          height="200"
          alt="Question Icon"/>
        <h2 className='d-flex justify-content-center mt-3 mb-5'>All Questions</h2>
      </Row>
      <Row>
        <Col>
          <ListGroup className='mx-5'>
            {questionRecords.map((questionRecord, index) => (
              <ListGroup.Item className='px-4 py-5 mx-5' key={index}>
                <Row className='d-flex justify-content-between flex-row'>
                  <Col>
                    <h4 className='font-weight-bold'>{ questionRecord.title }</h4>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <p>{ moment(questionRecord.date).format('YYYY-MM-DD') }</p>
                  </Col>
                </Row>
                <p>{ questionRecord.description }</p>
                <Row>
                  <Col>
                    <Button className="btn btn-secondary blueBtns m-2" style={{fontWeight:"normal"}} onClick={() => {
                      setQuestionId(questionRecord.id);
                      setTitle(questionRecord.title);
                      setDescription(questionRecord.description);
                      setShowEditModal(true);
                    }}>Edit</Button>
                    <Button className="btn btn-danger m-2" onClick={async () => await handleDelete(questionRecord.id)}>Delete</Button>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <Link className='' to={`/questions/${questionRecord.id}`}>View</Link>
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
              <Button className="btn btn-secondary saveBtns m-2" style={{fontWeight:"normal"}} onClick={() => showEditModal ? handleEdit() : handleAdd()}>{ showEditModal ? 'Edit' : 'Ask'}</Button>
              <Button className="btn btn-danger m-2" onClick={() => handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default QuestionsList;