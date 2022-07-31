import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form, ToggleButton, ButtonGroup, Navbar } from 'react-bootstrap';

import saveInnLogo from "../assets/images/saveInnLogo.svg";
import communityIcon from "../assets/images/communityIcon.svg";

import '../App.css';

function GroupsList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [groupId, setGroupId] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const [groupRecords, setGroupRecords] = useState([]);

  useEffect(() => {
    (async function() {
      await handleRefresh();
    }());
  }, []);

  async function handleRefresh() {
    try {
      const endpoint = 'http://localhost:8080/group';

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setGroupRecords(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd() {
    try {
      const endpoint = 'http://localhost:8080/group';

      const body = {
        name,
        description,
        isPublic,
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
      const endpoint = `http://localhost:8080/group/${groupId}`;

      const body = {
        name,
        description,
        isPublic,
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

  async function handleDelete(_groupId) {
    try {
      const endpoint = `http://localhost:8080/group/${_groupId}`;

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
    setGroupId(0);
    setName('');
    setDescription('');
    setIsPublic(false);
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
              <Navbar.Text>Get your community involved!</Navbar.Text>
              <Button className="btn btn-secondary saveBtns m-2" onClick={() => setShowAddModal(true)}>Create Group</Button>
          </Container>
        </Navbar>
      </Row>
      <Row className='px-5 mt-3 d-flex justify-content-center'>
        <img 
          src= {communityIcon}
          width="320"
          height="250"
          alt="CommunityIcon"/>
        <h2 className='d-flex justify-content-center mt-4 mb-5'>Groups</h2>
      </Row>
      <Row>
        <Col>
          <ListGroup className='mx-5'>
            {groupRecords.map((groupRecord, index) => (
              <ListGroup.Item className='px-4 py-3 mx-5' key={index}>
                <Row>
                  <Col className='d-flex justify-content-between flex-row'>
                    <h4 className='font-weight-bold'>{ groupRecord.name }</h4>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <p className='text-muted'>{ groupRecord.isPublic ? 'Public Group' : 'Private Group' }</p>
                  </Col>
                </Row>
                <p>{ groupRecord.description }</p>
                <Row>
                  <Col>
                    <Button className="btn btn-secondary blueBtns m-2" style={{fontWeight:"normal"}} onClick={() => {
                      setGroupId(groupRecord.id);
                      setName(groupRecord.name);
                      setDescription(groupRecord.description);
                      setIsPublic(groupRecord.isPublic);
                      setShowEditModal(true);
                    }}>
                      Edit
                    </Button>
                    <Button className="btn btn-danger m-2" onClick={async () => await handleDelete(groupRecord.id)}>Delete</Button>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <Link to={`/groups/${groupRecord.id}`}>View</Link>
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
                Create Group
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
                  <Form.Label>Public</Form.Label>
                  <Form.Check onChange={(e) => setIsPublic(!isPublic)} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-secondary saveBtns m-2" style={{fontWeight:"normal"}} onClick={() => showEditModal ? handleEdit() : handleAdd()}>{ showEditModal ? 'Edit' : 'Create'}</Button>
              <Button className="btn btn-danger m-2" onClick={() => handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default GroupsList;