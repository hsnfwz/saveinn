import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from 'react-bootstrap';

// context
import { AuthContext } from '../context/AuthContext';

// images
import saveInnLogo from '../assets/images/saveInnLogo.svg';

//css
import '../App.css';

function DashboardInfo() {
    const auth = useContext(AuthContext);

    let navigate = useNavigate();

    async function handleSignOut() {
        await auth.signOut();
        if (!auth.user) navigate("/", { replace: false });
    }

    return(
        <Container fluid>
            <Navbar className="p-4 mb-2">
                <Container className="d-flex justify-content-start">
                <Navbar.Brand className="brandLogo d-flex align-items-center" style={{color: "#63D3A9"}} href="/dashboard">
                    <img 
                    src= {saveInnLogo}
                    width="50"
                    height="50"
                    className="d-inline-block align-top mx-2"
                    alt="Save Inn logo"/>
                    My Dashboard</Navbar.Brand>
                <Nav xs={6}>
                    <Nav.Link href="/budget-members/1">My Account</Nav.Link>
                    <Nav.Link href="/questions">Questions</Nav.Link>
                    <Nav.Link href="/groups">Groups</Nav.Link>
                    <Nav.Link href="/budget-plans">My Plans</Nav.Link>
                </Nav>
                </Container>
                <Container className="d-flex justify-content-end">
                    <Button type="button" className="btn btn-secondary saveBtns px-5" onClick={async () => await handleSignOut()}>Log Out</Button>
                </Container>
            </Navbar>
        </Container>
    )
}

export default DashboardInfo