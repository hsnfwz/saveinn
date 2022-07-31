import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Navbar } from 'react-bootstrap';

// context
import { AuthContext } from '../context/AuthContext';

// images
import saveInnLogo from '../assets/images/saveInnLogo.svg';

// css
import '../App.css';

function LogInInfo(props) {
    const auth = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    async function handleLogIn() {
        await auth.signIn(email, password);
        if (auth.user) navigate("/dashboard", { replace: false });
    }

    return (
        <Container fluid className="px-5 py-3" style={{height:"100vh"}}>
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
                    <Navbar.Text>New to Save Inn?</Navbar.Text>
                    <Button type="button" className="btn btn-light m-2" onClick={() => navigate("/sign-up", { replace: false })}>Sign Up</Button>
                </Container>
            </Navbar>
            <Form className="d-flex flex-column justify-content-center align-items-center d-grid gap-2 col-6 mx-auto" style={{height:"70vh"}}>
                <Form.Label className="h4">Log In</Form.Label>
                <br/>
                <span>{auth.signInMessage}</span>
                <Form.Group className="my-2">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="formInput"/>
                </Form.Group>
                <Form.Group className="my-2">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="formInput"/>
                </Form.Group>
                <Button type="button" className="btn btn-secondary saveBtns my-2 formInput" disabled={!email || !password} onClick={async () => await handleLogIn()}>Log In</Button>
            </Form>
        </Container>
    );
}

export default LogInInfo;