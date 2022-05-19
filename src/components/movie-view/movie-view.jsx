import React from "react";
import PropTypes from 'prop-types';
import { Card, Button, Row, Col } from 'react-bootstrap';
import "./movie-view.scss";

import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Row className='justify-content-md-center'>
        <Col md={4} className="">
          <Card className="movie-view">
            <Card.Img className="movie-poster" variant="top" src={movie.imagePath} crossOrigin="true" alt="Movie Image" />
            <Card.Body>
              <Card.Title className="movie-title">{movie.title}</Card.Title>
              <Card.Text className="movie-description">{movie.description}</Card.Text>
              <Link to={`/director/${movie.director.name}`}>
                <Button variant="outline-info" className="info-buttons">Director</Button>
              </Link>
              <Link to={`/genre/${movie.genre.name}`}>
                <Button variant="outline-info" className="info-buttons">Genre</Button>
              </Link>
              <Button variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};