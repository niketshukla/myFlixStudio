import React, {useState} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import "./register-view.scss"

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(username, password);
      /* Send a request to the server for authentication */
      /* then call props.onLoggedIn(username) */
      props.onLoggedIn(username);
    };
  
    return (
        <Row className='justify-content-md-center'>
            <Col md={6} className="form-wrapper">
                <Form>
                    <h3 className='text-center'>Welcome to My Flix Studio</h3>
                    <Form.Group controlId="formUserName">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Sign up</Button>
                </Form>
            </Col>
        </Row>
    );
  }
