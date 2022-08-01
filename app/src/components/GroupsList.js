import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form, ToggleButton, ButtonGroup, Navbar } from 'react-bootstrap';

// images
import saveInnLogo from '../assets/images/saveInnLogo.svg';
import communityIcon from '../assets/images/communityIcon.svg';

// css
import '../App.css';

function GroupsList({ auth }) {
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
      const endpoint = 'http://localhost:5000/user_group';

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setGroupRecords(data.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd() {
    try {
      const endpoint = 'http://localhost:5000/user_group';

      const body = {
        name,
        description,
        isPublic,
      };

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

      const userGroupId = data.row.userGroupId;

      const endpoint2 = 'http://localhost:5000/user_belongs_to_group';

      const body2 = {
        userGroupId,
        saveinnUserId: auth.user.saveinnUserId,
      };

      const options2 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body2),
        credentials: 'include',
      };

      const res2 = await fetch(endpoint2, options2);
      const data2 = await res2.json();

      handleClose();
      await handleRefresh();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit() {
    try {
      const endpoint = `http://localhost:5000/user_group/${groupId}`;

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
      const endpoint = `http://localhost:5000/user_group/${_groupId}`;

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
      <Row className='px-5 mt-3 d-flex justify-content-center'>
        <img 
          src= {communityIcon}
          width="320"
          height="250"
          alt="CommunityIcon"/>
        <h2 className='d-flex justify-content-center mt-4 mb-5'>Groups</h2>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col className='d-flex justify-content-center'>
          <Button type="button" className="btn btn-secondary saveBtns m-2" onClick={() => setShowAddModal(true)}>Create Group</Button>
        </Col>
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
                    <Button type="button" className="btn btn-secondary blueBtns m-2" style={{ fontWeight: "normal" }} onClick={() => {
                      setGroupId(groupRecord.userGroupId);
                      setName(groupRecord.name);
                      setDescription(groupRecord.description);
                      setIsPublic(groupRecord.isPublic);
                      setShowEditModal(true);
                    }}>
                      Edit
                    </Button>
                    <Button type="button" className="btn btn-danger m-2" onClick={async () => await handleDelete(groupRecord.userGroupId)}>Delete</Button>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <Link to={`/groups/${groupRecord.userGroupId}`}>View</Link>
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
                Group
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Name*</Form.Label>
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
              <Button type="button" className="btn btn-secondary saveBtns m-2" style={{ fontWeight: "normal" }} onClick={() => showEditModal ? handleEdit() : handleAdd()} disabled={!name}>{ showEditModal ? 'Edit' : 'Create'}</Button>
              <Button type="button" className="btn btn-danger m-2" onClick={() => handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default GroupsList;