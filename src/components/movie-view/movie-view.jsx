import React from "react";
import {Card, Button} from 'react-bootstrap';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Card className="movie-view">
        <Card.Body>
          <Card.Img className="movie-poster" variant="top" src={movie.imagePath} crossOrigin="true" alt="Movie Image" />
          <Card.Title className="movie-title">{movie.title}</Card.Title>
          <Card.Title className="movie-description">{movie.description}</Card.Title>
          <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}
