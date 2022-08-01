import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Navbar } from 'react-bootstrap';

function LogInInfo({ auth }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        const timeId = setTimeout(() => {
            auth.setSignInMessage('');
        }, 3000);

        return () => {
            clearTimeout(timeId);
        }
    }, [auth.signInMessage]);

    async function handleLogIn() {
        await auth.signIn(email, password);
        if (auth.user) navigate("/dashboard", { replace: false });
    }

    return (
        <Container fluid className="px-5 py-3">
            <Container fluid className="d-flex flex-column justify-content-center align-items-center">
            <Form style={{ width: '30vw' }}>
                <Form.Label className="d-flex justify-content-center h4">Log In</Form.Label>
                <br />
                <div className="d-flex justify-content-center">
                    <div className="d-flex align-items-center">
                        <Form.Label>New to Save Inn?</Form.Label>
                    </div>
                    <div>
                        <Button type="button" className="saveinn-green-btn" onClick={() => navigate("/sign-up", { replace: false })}>Sign Up</Button>
                    </div>
                </div>
                <br/>
                <div className="d-flex justify-content-center">{auth.signInMessage}</div>
                <br />
                <Form.Group className="my-2">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="formInput"/>
                </Form.Group>
                <Form.Group className="my-2">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="formInput"/>
                </Form.Group>
                <br />
                <Button type="button" className="saveinn-green-btn" disabled={!email || !password} onClick={async () => await handleLogIn()}>Log In</Button>
            </Form>
            </Container>
        </Container>
    );
}

export default LogInInfo;