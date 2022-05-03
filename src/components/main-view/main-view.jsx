import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Navbar } from "../navbar/navbar";
import { LoginView } from '../login-view/login-view';
import { RegistrationView} from '../register-view/register-view';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import {Row, Col} from 'react-bootstrap/';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://myflixstudio.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movies, user } = this.state;
    
    return (
      <Router>
        <Navbar user={user} />
        <Row className="main-view justify-content-md-center">
          <Routes>
            <Route exact path="/" render={() => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              return movies.map(m => (
                <Col md={6} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />
            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col lg={6} md={6}>
                <RegistrationView />
              </Col>
            }} />
            <Route path="/movies/:movieId" render={({ match, history }) => {
              return <Col md={4}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            <Route exact path="/genre/:name" render={({ match, history }) => {
              return <Col>
                <GenreView genre={movies.find(m => m._id === match.params.name).genre} onBackClick={() => history.goBack()} />
              </Col>
            }}/>
            <Route exact path="/director/:name" render={({ match, history }) => {
              return <Col>
                <DirectorView director={movies.find(m => m._id === match.params.name).director} onBackClick={() => history.goBack()} />
              </Col>
            }}/>
            <Route path={`/users/${user}`} render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              return <Col>
                <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            <Route path={`/user-update/${user}`} render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              return <Col>
                <UserUpdate user={user} onBackClick={() => history.goBack()} />
              </Col>
            }} />
          </Routes>
        </Row>
      </Router>
    );
  }
}

export default MainView;
