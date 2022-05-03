import React from "react";
import PropTypes from 'prop-types';
import {Card, Button} from 'react-bootstrap';
import "./movie-view.scss"

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Card className="movie-view">
        <Card.Img className="movie-poster" variant="top" src={movie.imagePath} crossOrigin="true" alt="Movie Image" />
        <Card.Body>
          <Card.Title className="movie-title">{movie.title}</Card.Title>
          <Card.Text className="movie-description">{movie.description}</Card.Text>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
          <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
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