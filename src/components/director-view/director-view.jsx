import React from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Button } from "react-bootstrap";
import './director-view.scss';

export class DirectorView extends React.Component{
    render() {
        const { director, onBackClick } = this.props;
        return (
            <Row className="justify-content-md-center">
                {console.log("I am inside")}
                <Col md={6} >
                    <Card className="director-view">
                        <Card.Body>
                            <Card.Title>{director.name}</Card.Title>
                            <Card.Text>Bio: {director.bio}</Card.Text>
                            <Card.Text>Birth: {director.birth}</Card.Text>
                            <Card.Text>Death: {director.death}</Card.Text>
                            <Button variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        birth: PropTypes.string.isRequired,
        // death: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
}