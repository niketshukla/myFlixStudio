import React from "react";
import "./profile-view.scss";
import PropTypes from "prop-types";

import { Container, Card, Button, Row, Col, Form, FormGroup, FormControl } from "react-bootstrap";
import axios from "axios";

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: []
        };
    }
    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    getUser(token) {
        const username = localStorage.getItem('user');

        axios.get(`https://myflixstudio.herokuapp.com/users/${username}`, {
            headers: { Authorization:`Bearer ${token}`}
        })
        .then(response => {
            this.setState({
                username: response.data.username,
                password: response.data.password,
                email: response.data.email,
                birthday: response.data.birthday,
                favoriteMovies: response.data.favoriteMovies
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    editUser = (e) => {
        e.preventDefault();
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://myflixstudio.herokuapp.com/users/${username}`, 
            {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                birthday: this.state.birthday
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        .then((response) => {
            this.setState({
                username: response.data.username,
                password: response.data.password,
                email: response.data.email,
                birthday: response.data.birthday
            });

            localStorage.setItem('user', this.state.username);
            alert("Profile updated");
            window.open(`/users/${user}`, '_self');
        });
    };

    removeFavorite = (e, movie) => {
        e.preventDefault();
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://myflixstudio.herokuapp.com/users/${username}/movies/${movie._id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        .then((response) => {
            console.log(response);
            alert("Movie removed");
            this.componentDidMount();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    deleteUser() {
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://myflixstudio.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            console.log(response);
            alert("Profile deleted");
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    setUsername(value) {
        this.setState({
            username: value
        });
    }

    setPassword(value) {
        this.setState({
            password: value
        });
    }

    setEmail(value) {
        this.setState({
            email: value
        });
    }

    setBirthday(value) {
        this.setState({
            birthday: value
        });
    }

    render() {
        const { movies } = this.props;
        const { favoriteMovies, username, email, birthday } = this.state;

        if (!username) {
            return null;
        }

        return (
            <Container>
                <Row>
                     <Col md={4}>
                        <Card className="profile-info">
                            <Card.Body>
                                <Card.Title>Your Info</Card.Title>
                                <Card.Text className="info-username">Name: {username}</Card.Text>
                                <Card.Text className="">Email: {email}</Card.Text>
                                <Card.Text className="">Birthday: {birthday}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card className="profile-view">
                            <Card.Body>
                                <Card.Title>Update Profile</Card.Title>
                                <Form className="update-form" onSubmit={(e) => this.editUser( e, this.username, this.password, this.email, this.birthday )}> 
                                    <FormGroup>
                                        <Form.Label>Name</Form.Label>
                                        <FormControl type="text" className="username" name="username" placeholder="New username" value={username} onChange={(e) => this.setUsername(e.target.value)} required/> 
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Password</Form.Label>
                                        <FormControl type="password" name="password" placeholder="New password" value="" onChange={(e) => this.setPassword(e.target.value)} required/> 
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Email</Form.Label>
                                        <FormControl type="email" name="email" placeholder="Enter email" value={email} onChange={(e) => this.setEmail(e.target.value)} required/> 
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Birthday</Form.Label>
                                        <FormControl type="date" name="birthday" value={birthday} onChange={(e) => this.setBirthdaye(e.target.value)} required/> 
                                    </FormGroup>
                                    <Button variant="outline-success" type="submit" onClick={this.editUser}>Update</Button> 
                                    <Button variant="outline-danger" onClick={() => this.deleteUser()}>Delete Profile</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="favorite-container">
                    {favoriteMovies.length === 0 && (
                        <div className="text-center">No favorite movies</div>
                    )}
                    {favoriteMovies.length > 0 && movies.map((movie) => {if (movie._id === favoriteMovies.find((fav)=> fav === movie._id)) {return ( 
                        <Col md={4} key={movie._id}>
                            <Card className="favorite-movie">
                                <Card.Img variant="top" src={movie.imagePath} crossOrigin="true" alt="Movie Image" />
                                <Card.Body>
                                    <Card.Title className="movie-title">{movie.Title}</Card.Title>
                                    <Button value={movie._id} variant="outline-danger" onClick={(e) => this.removeFavorite(e, movie)}>Remove</Button> 
                                </Card.Body>
                            </Card>
                        </Col>
                        );
                    }})}
                </Row>
            </Container>
        )
    }
}

ProfileView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imagePath: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        }).isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            birth: PropTypes.string.isRequired,
            // death: PropTypes.string.isRequired
        }).isRequired,
    })).isRequired
};