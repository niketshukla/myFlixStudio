import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Form, Button } from 'react-bootstrap';
import "./register-view.scss"

import axios from "axios";

export function RegistrationView() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    const [ values, setValues ] = useState({
        usernameErr: '',
        passwordErr: '',
        emailErr: ''
    });
  
    const validate = () => {
        let isReq = true;

        if(!username){
            setValues({...values, usernameErr: 'Username is Required'});
            isReq = false;
        } else if(username.length < 2){
            setValues({...values, usernameErr: 'Username must be 2 characters long'});
            isReq = false;
        }
        if(!password){
            setValues({...values, passwordErr: 'Password is Required'});
            isReq = false;
        } else if(password.length < 5){
            setValues({...values, passwordErr: 'Password must be 5 characters long'});
            isReq = false;
        }
        if(!email){
            setValues({...values, emailErr: 'Email is Required'});
            isReq = false;
        } else if(email.indexOf('@') === -1) {
            setValues({...values, emailErr: 'Email is invalid'});
            isReq = false;
        }
      
        return isReq;
    }

    const handleRegister = (e) => {
      e.preventDefault();
      const isReq = validate();

      if(isReq){
        /* Send a request to the server for authentication */
        axios.post('https://myflixstudio.herokuapp.com/users', {
          username: username,
          password: password,
          email: email,
          birthday: birthday
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.error('error registering the user');
        });
      }
    };
  
    return (
        <Row className='justify-content-md-center'>
            <Col md={4} className="form-wrapper">
                <Form>
                    <h3 className='text-center welcome'>Welcome to My Flix Studio</h3>
                    <Form.Group controlId="formUserName">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                        {values.usernameErr && <p>{values.usernameErr}</p>}
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        {values.passwordErr && <p>{values.passwordErr}</p>}
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        {values.emailErr && <p>{values.emailErr}</p>}
                    </Form.Group>
                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="date" name='birthday' onChange={e => setBirthday(e.target.value)} />
                    </Form.Group>
                    <Button variant="outline-primary" type="submit" onClick={handleRegister}>Sign Up</Button>
                    <p>Already registered <Link to={'/'}>Login</Link> here </p>
                </Form>
            </Col>
        </Row>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }),
};