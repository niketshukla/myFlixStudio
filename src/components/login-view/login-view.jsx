import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import "./login-view.scss"

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if(!username){
    setUsernameErr('Username Required');
    isReq = false;
    }else if(username.length < 2){
    setUsernameErr('Username must be 2 characters long');
    isReq = false;
    }
    if(!password){
    setPasswordErr('Password Required');
    isReq = false;
    }else if(password.length < 5){
    setPasswordErr('Password must be 5 characters long');
    isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    
    if(isReq){
      /* Send a request to the server for authentication */
      axios.post('https://myflixstudio.herokuapp.com/login', {
        username: username,
        password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
    }
  };

  return (
    <Row className='justify-content-md-center'>
      <Col md={6} className="form-wrapper">
        <Form>
          <h3 className='text-center welcome'>Welcome to My Flix Studio</h3>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
            {/* code added here to display validation error */}
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
            {/* code added here to display validation error */}
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
        </Form>
      </Col>
    </Row>  
  );
}

LoginView.propTypes = {
  login: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired
};