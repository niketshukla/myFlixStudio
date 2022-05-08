import React from "react";
import { Nav, Navbar, Container } from 'react-bootstrap';

export function Navbar({ user }) {
    
    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    };
    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return (localStorage.getItem("token"));
        } else {
            return false;
        }
    };

    return (
        <Navbar className="mainNav" sticky="top" expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand className="logo" href="/">MyFlixStudio</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar" />
                <Navbar.Collapse id="navbar-collapse">
                    <Nav className="ml-auto">
                        { isAuth() && (<Nav.Link href={`/users/${user}`}>{user}</Nav.Link>) }
                        { isAuth() && (<Nav.Link variant="link" onClick={() => {onLoggedOut()}}>Logout</Nav.Link>) }
                        { !isAuth() && (<Nav.Link href='/'>Login</Nav.Link>) }
                        { !isAuth() && (<Nav.Link href='/register'>Register</Nav.Link>) }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}