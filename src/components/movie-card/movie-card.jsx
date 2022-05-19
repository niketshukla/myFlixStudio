import React from "react";
import PropTypes from 'prop-types';
import {Button, Card, Container, Row} from 'react-bootstrap';
import "./movie-card.scss"

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
        <Card className="movie-card-wrapper">
          <Card.Img variant="top" src={movie.imagePath} crossOrigin="true" alt="Movie Image" />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="outline-primary">Open</Button>
            </Link>
          </Card.Body>
        </Card>
    );
  }
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
  }).isRequired
};