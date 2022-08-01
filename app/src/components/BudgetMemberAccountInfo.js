import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form, Navbar } from 'react-bootstrap';

// images
import saveInnLogo from '../assets/images/saveInnLogo.svg';
import userIcon from '../assets/images/userIcon.svg';

function BudgetMemberAccountInfo({ auth }) {
  const [errorMessage, setErrorMessage] = useState('');

  const [showEditUsername, setShowEditUsername] = useState(false);
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [showEditInfo, setShowEditInfo] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [employmentPosition, setEmploymentPosition] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    (async function() {
      await handleRefresh();
    }());
  }, []);

  async function handleRefresh() {
    try {
      const endpoint = `http://localhost:5000/budget_member/${auth.user.budgetMemberId}`;

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      const endpoint2 = `http://localhost:5000/saveinn_user/${auth.user.saveinnUserId}`;

      const res2 = await fetch(endpoint2, options);
      const data2 = await res2.json();

      if (data.row && data2.row) {
        setFirstName(data.row.firstName);
        setLastName(data.row.lastName);
        setPostalCode(data.row.postalCode);
        setEmploymentPosition(data.row.employmentPosition);
        setUsername(data2.row.username);
        setEmail(data2.row.email);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditInfo() {
    try {
      const endpoint = `http://localhost:5000/budget_member/${auth.user.budgetMemberId}`;

      const body = {
        firstName,
        lastName,
        employmentPosition,
        postalCode,
      };

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

      setShowEditInfo(false);

      await handleRefresh();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditUsername() {
    try {
      const endpoint = `http://localhost:5000/saveinn_user/update_username/${auth.user.saveinnUserId}`;

      const body = {
        username,
      };

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

      if (data.message !== 'Success') {
        setErrorMessage(data.message);
      } else {
        setErrorMessage('');
        setShowEditUsername(false);
        await handleRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditEmail() {
    try {
      const endpoint = `http://localhost:5000/saveinn_user/update_email/${auth.user.saveinnUserId}`;

      const body = {
        email,
      };

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

      if (data.message !== 'Success') {
        setErrorMessage(data.message);
      } else {
        setErrorMessage('');
        setShowEditEmail(false);
        await handleRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditPassword() {
    try {
      const endpoint = `http://localhost:5000/saveinn_user/update_password/${auth.user.saveinnUserId}`;

      const body = {
        password,
      };

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

      if (data.message !== 'Success') {
        setErrorMessage(data.message);
      } else {
        setErrorMessage('');
        setShowEditPassword(false);
        await handleRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      const endpoint = `http://localhost:5000/budget_member/${auth.user.budgetMemberId}`;

      const options = {
        method: 'DELETE',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      auth.signOut();
      navigate("/", { replace: false });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container fluid style={{ height: '100vh' }}> 
      <Row>
        <Row>
          <Col className='d-flex align-items-center justify-content-center pt-2'>
            <h2>Account</h2>
          </Col>
        </Row>
        <Row>
          <Col className='d-flex align-items-center justify-content-center pt-2'>
            <img
            src= {userIcon}
            width="100"
            height="100"
            className="mx-2"
            alt="Save Inn logo"
            />
          </Col>
        </Row>
      </Row>
      <br />
      <Row>
        <Col>
          <span className="d-flex flex-column justify-content-center align-items-center">{errorMessage}</span>
        </Col>
      </Row>
      <br />
      <Container fluid className="d-flex flex-column justify-content-center align-items-center">
          <Form style={{ width: '50vh' }}>
            {showEditUsername && (
              <Form.Group className="my-2">
                <Form.Label>Username*</Form.Label>
                <Form.Control type="text" value={username} placeholder="Username" onChange={(e)=>setUsername(e.target.value)} className="formInput"/>
                <div>
                  <Button type="button" className="saveinn-green-btn" onClick={async () => await handleEditUsername()} disabled={!username}>Submit</Button>
                  <Button type="button" className="saveinn-red-btn" onClick={() => {
                    setShowEditUsername(false);
                    setErrorMessage('');
                  }}>Cancel</Button>
                </div>
              </Form.Group>
            )}
            {!showEditUsername && (
              <Row>
                <Col>
                  <p>Username: {username}</p>
                </Col>
                <Col>
                  <Button type="button" className="saveinn-blue-btn" onClick={() => setShowEditUsername(true)}>Edit</Button>
                </Col>
              </Row>
            )}
            {showEditEmail && (
              <Form.Group className="my-2 col">
                  <Form.Label>Email*</Form.Label>
                  <Form.Control type="email" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                  <div>
                    <Button type="button" className="saveinn-green-btn" onClick={async () => await handleEditEmail()} disabled={!email}>Submit</Button>
                    <Button type="button" className="saveinn-red-btn" onClick={() => {
                      setShowEditEmail(false);
                      setErrorMessage('');
                    }}>Cancel</Button>
                  </div>
              </Form.Group>
            )}
            {!showEditEmail && (
              <Row>
                <Col>
                  <p>Email: {email}</p>
                </Col>
                <Col>
                  <Button type="button" className="saveinn-blue-btn" onClick={() => setShowEditEmail(true)}>Edit</Button>
                </Col>
              </Row>
            )}
            {showEditPassword && (
              <Form.Group className="my-2">
                <Form.Label>Password*</Form.Label>
                <Form.Control type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="formInput"/>
                <div>
                  <Button type="button" className="saveinn-green-btn" onClick={async () => await handleEditPassword()} disabled={!password}>Submit</Button>
                  <Button type="button" className="saveinn-red-btn" onClick={() => {
                    setShowEditPassword(false);
                    setErrorMessage('');
                  }}>Cancel</Button>
                </div>
              </Form.Group>
            )}
            {!showEditPassword && (
              <Row>
                <Col>
                  <p>Password is hidden</p>
                </Col>
                <Col>
                  <Button type="button" className="saveinn-blue-btn" onClick={() => setShowEditPassword(true)}>Edit</Button>
                </Col>
              </Row>
            )}
            {showEditInfo && (
              <>
                <div className="row">
                    <Form.Group className="my-2 col">
                        <Form.Label>First Name*</Form.Label>
                        <Form.Control type="text" value={firstName} placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="my-2 col">
                        <Form.Label>Last Name*</Form.Label>
                        <Form.Control type="text" value={lastName} placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)}/>
                    </Form.Group>
                </div>
                <Form.Group className="my-2 col">
                    <Form.Label>Postal Code*</Form.Label>
                    <Form.Control type="text" value={postalCode} placeholder="Postal Code" onChange={(e)=>setPostalCode(e.target.value)}/>
                </Form.Group>
                <Form.Group className="my-2">
                    <Form.Label>Employment Position</Form.Label>
                    <Form.Control type="text" value={employmentPosition} placeholder="Employment" onChange={(e)=>setEmploymentPosition(e.target.value)} className="formInput"/>
                </Form.Group>
                <div>
                  <Button type="button" className="saveinn-green-btn" onClick={async () => await handleEditInfo()} disabled={!firstName || !lastName || !postalCode}>Submit</Button>
                  <Button type="button" className="saveinn-red-btn" onClick={() => setShowEditInfo(false)}>Cancel</Button>
                </div>
              </>
            )}
            {!showEditInfo && (
              <Row>
                <Col>
                  <p>First Name: {firstName}</p>
                  <p>Last Name: {lastName}</p>
                  <p>Postal Code: {postalCode}</p>
                  <p>Employment Position: {employmentPosition}</p>
                  <Button type="button" className="saveinn-blue-btn" onClick={() => setShowEditInfo(true)}>Edit</Button>
                </Col>
              </Row>
            )}
            <Button type="button" className="saveinn-red-btn" onClick={async () => await handleDelete()}>Delete Account</Button>
          </Form>
      </Container>
    </Container>
  );
}

export default BudgetMemberAccountInfo;