import { Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
//Images
import saveInnLogo from "../layouts/images/saveInnLogo.svg";
//css
import '../App.css';
import { useNavigate } from "react-router-dom";

function DashboardList(){

    let navigate = useNavigate();

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
                    <Button className="btn btn-secondary saveBtns px-5" onClick={() => navigate("/")}>Log Out</Button>
                </Container>
            </Navbar>
        </Container>
    )
}

export default DashboardList