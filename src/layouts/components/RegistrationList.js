import { Container, Row, Col, Navbar, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import saveInnLogo from "../images/saveInnLogo.svg";

import '../../App.css';

function RegistrationList(props){
    const [isAssistant, setIsAssistant] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [employment, setEmployment] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState(0);
    const [areaOfExpertise, setAreaOfExpertise] = useState("");

    let navigate = useNavigate();
    const location = useLocation();

    const radioChange = (e) =>{
        e.target.value == "yes"?
        setIsAssistant(true)
        : setIsAssistant(false)
    }

    return(
        <Container fluid className="px-5 py-3">
            <Navbar className="d-flex justify-content-between">
                <Container fluid>
                    <Navbar.Brand className="brandLogo d-flex align-items-center" style={{color: "#63D3A9"}} href="/">
                        <img 
                        src= {saveInnLogo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top mx-2"
                        alt="Save Inn logo"/>
                    </Navbar.Brand>
                </Container>
                <Container fluid className="d-flex justify-content-end">
                    <Navbar.Text>Already have an account?</Navbar.Text>
                    <Button className="btn btn-light m-2" onClick={()=>navigate("/log-in", {replace: true})}>Log In</Button>
                </Container>
            </Navbar>
            <Container fluid className="d-flex flex-column justify-content-center align-items-center">
                <Form style={{width: "50vh"}}>
                    <Form.Label className="d-flex justify-content-center h4">Sign Up</Form.Label>
                    <div className="row">
                        <Form.Group className="my-2 col">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={firstName} placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="my-2 col">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={lastName} placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)}/>
                        </Form.Group>
                    </div>
                    <Form.Group className="my-2">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={username} placeholder="Username" onChange={(e)=>setUsername(e.target.value)} className="formInput"/>
                    </Form.Group>
                    <div className="row">
                        <Form.Group className="my-2 col">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="my-2 col">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control type="text" value={postalCode} placeholder="Postal Code" onChange={(e)=>setPostalCode(e.target.value)}/>
                        </Form.Group>
                    </div>
                    <Form.Group className="my-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="formInput"/>
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>Are you a financial advisor? </Form.Label>
                        <Form.Check inline label="Yes" value="yes" name="assistant" type="radio" id="inline-radio-1" checked={isAssistant} onChange={radioChange}/>
                        <Form.Check inline label="No" value="no" name="assistant" type="radio" id="inline-radio-2" checked={!isAssistant} onChange={radioChange}/>
                    </Form.Group>
                    {
                        isAssistant?
                        <div className="row">
                            <Form.Group className="my-2 col">
                                <Form.Label>Area of Expertise</Form.Label>
                                <Form.Control type="text" value={areaOfExpertise} placeholder="Area of Expertise" onChange={(e)=>setAreaOfExpertise(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="my-2 col">
                                <Form.Label>Years of Experience</Form.Label>
                                <Form.Control  type="number" value={yearsOfExperience} placeholder="Enter a number" min="0" onChange={(e)=>setYearsOfExperience(e.target.value)}/>
                            </Form.Group>
                        </div>
                        : <Form.Group className="my-2">
                            <Form.Label>Employment</Form.Label>
                            <Form.Control type="text" value={employment} placeholder="Employment" onChange={(e)=>setEmployment(e.target.value)} className="formInput"/>
                        </Form.Group>
                    }
                    <Button className="btn btn-secondary saveBtns my-2 formInput">Sign Up</Button>
                </Form>
            </Container>
        </Container>
    )
}

export default RegistrationList