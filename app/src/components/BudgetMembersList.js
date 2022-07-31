import { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Modal, Form, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import saveInnLogo from "../assets/images/saveInnLogo.svg";
import userIcon from "../assets/images/userIcon.svg";
import membersIcon from "../assets/images/membersIcon.svg"

import '../App.css';

function BudgetMembersList() {
  const [budgetMemberRecords, setBudgetMemberRecords] = useState([]);

  useEffect(() => {
    (async function() {
      await handleRefresh();
    }());
  }, []);

  async function handleRefresh() {
    try {
      const endpoint = 'http://localhost:8080/budgetMember';

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setBudgetMemberRecords(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container fluid>
      <Row>
        <Navbar className="d-flex justify-content-between py-4" style={{backgroundColor:"#ffffff"}}>
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
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Find members by username..."
              className="me-2"
              aria-label="Search"
              style={{width:"16em"}}
            />
            <Button className="btn btn-secondary saveBtns px-5">Search</Button>
          </Form>
        </Navbar>
      </Row>
      <Row className='px-5 mt-3 d-flex justify-content-center'>
        <img 
          src= {membersIcon}
          width="200"
          height="200"
          alt="Members Icon"/>
        <h2 className='d-flex justify-content-center mt-3 mb-5'>Members</h2>
      </Row>
      <Row className='mx-5'>
        <Col>
          <ListGroup className='mx-5'>
            {budgetMemberRecords.map((budgetMemberRecord, index) => (
              <ListGroup.Item className='mx-5' key={index}>
                <Row className='py-2'>
                  <Col md="auto">
                    <img
                    src= {userIcon}
                    width="100"
                    height="100"
                    className="mx-2"
                    alt="Save Inn logo"
                    />
                  </Col>
                  <Col>
                    <Row>
                      <Col className='d-flex flex-row'>
                        <p className='me-1'>Name: { budgetMemberRecord.firstName }</p>
                        <p>{ budgetMemberRecord.lastName }</p>
                      </Col>
                    </Row>
                    <Row>
                      <p>Employment: { budgetMemberRecord.employmentPosition }</p>
                    </Row>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <Link to={`/budget-members/${budgetMemberRecord.id}`}>View Profile</Link>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetMembersList;