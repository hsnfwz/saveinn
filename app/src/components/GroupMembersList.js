import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form, Navbar } from 'react-bootstrap';

// images
import userIcon from '../assets/images/userIcon.svg';
import userAssistantIcon from '../assets/images/userAssistantIcon.svg';
import communityIcon from '../assets/images/communityIcon.svg';

// css
import '../App.css';

function GroupMembersList({ auth }) {
  const [showAddModal, setShowAddModal] = useState(false);

  const [fullName, setFullName] = useState('');

  const [groupMemberRecords, setGroupMemberRecords] = useState([]);

  const location = useLocation();

  useEffect(() => {
    (async function() {
      await handleRefresh();
    }());
  }, []);

  async function handleRefresh() {
    const userGroupId = location.pathname.split('/')[2];

    try {
      const endpoint = `http://localhost:5000/user_belongs_to_group?userGroupId=${userGroupId}`;

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      const endpoint2 = data.rows[0].budgetMemberId
        ? `http://localhost:5000/budget_member/${data.rows[0].budgetMemberId}`
        : `http://localhost:5000/budget_member/${data.rows[0].budgetAssistantId}`

      const res2 = await fetch(endpoint2, options);
      const data2 = await res2.json();

      setGroupMemberRecords([data2.row]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd() {
    // try {
    //   const endpoint = 'http://localhost:5000/user_belongs_to_group';

    //   const body = {
    //     name,
    //     description,
    //     isPublic,
    //   }

    //   const options = {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(body),
    //     credentials: 'include',
    //   };

    //   const res = await fetch(endpoint, options);
    //   const data = await res.json();

    //   handleClose();
    //   await handleRefresh();
    // } catch (error) {
    //   console.log(error);
    // }
  }

  async function handleDelete(userGroupId, saveinnUserId) {
    try {
      const endpoint = `http://localhost:5000/user_belongs_to_group/${userGroupId}/${saveinnUserId}`;

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
    setShowAddModal(false);
  }

  return (
    <Container fluid>
      <Row className='px-5 mt-3 d-flex justify-content-center'>
        <img 
          src= {communityIcon}
          width="320"
          height="250"
          alt="CommunityIcon"/>
        <h2 className='d-flex justify-content-center mt-4 mb-5'>Group Members</h2>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col className='d-flex justify-content-center'>
          <Button type="button" className="btn btn-secondary saveBtns m-2" onClick={() => setShowAddModal(true)}>Add Group Member</Button>
        </Col>
      </Row>
      <Row className='mx-5 mt-3 px-5'>
        <Col>
          <ListGroup>
            {groupMemberRecords.map((groupMemberRecord, index) => (
              <ListGroup.Item key={index}>
                <Row className='d-flex align-items-center'>
                  <Col md="auto">
                    <img
                    src={groupMemberRecord.budgetMemberId ? userIcon : userAssistantIcon}
                    width="50"
                    height="50"
                    className="mx-2"
                    alt="Save Inn logo"
                    />
                  </Col>
                  <Col className='d-flex flex-row align-items-center pt-2'>
                    <h6 className='me-1'>{ groupMemberRecord.firstName }</h6>
                    <h6>{ groupMemberRecord.lastName }</h6>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <Button type="button" className="btn-danger" onClick={async () => await handleDelete(groupMemberRecord.userGroupId, groupMemberRecord.saveinnUserId)}>Delete</Button>
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
            show={showAddModal}
            onHide={() => handleClose()}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Add Group Member
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" className="btn btn-secondary saveBtns m-2" style={{ fontWeight: "normal" }} onClick={() => handleAdd()}>Add</Button>
              <Button type="button" className="btn btn-danger m-2" onClick={() => handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default GroupMembersList;