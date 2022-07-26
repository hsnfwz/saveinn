import { useState } from 'react';
import { Container, Row, Col, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const projectedData = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    employmentPosition: 'Engineer',
    location: 'Vancouver, BC, Canada'
  },
  {
    id: 2,
    firstName: 'Sarah',
    lastName: 'Shaw',
    employmentPosition: 'Doctor',
    location: 'Toronto, Ontario, Canada'
  },
];

function BudgetMembersList() {

  async function handleRefresh() {
    // send request
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Budget Members</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {projectedData.map((projectedData, index) => (
              <ListGroup.Item key={index}>
                <p>{ projectedData.firstName }</p>
                <p>{ projectedData.lastName }</p>
                <p>{ projectedData.employmentPosition }</p>
                <p>{ projectedData.location }</p>
                <Link to={`/budget-members/${projectedData.id}`}>View</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetMembersList;