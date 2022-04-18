import React from "react";
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <Card>
        <Card.Img variant="top" src={movie.imagePath} crossOrigin="true" alt="Movie Image" />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="primary">Open</Button>
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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};