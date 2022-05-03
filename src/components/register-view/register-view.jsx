import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Button } from 'react-bootstrap';
import "./register-view.scss"

export function RegistrationView(props) {
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
        } else if(indexOf('@') === -1) {
            setValues({...values, emailErr: 'Email is invalid'});
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
          password: password,
          email: email,
          birthday: birthday
        })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration is successful, please login!');
          window.open('/', '_self');
        })
        .catch(e => {
          console.error(response);
          alert('unable to register');
        });
      }
    };
  
    return (
        <Row className='justify-content-md-center'>
            <Col md={6} className="form-wrapper">
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
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Sign Up</Button>
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