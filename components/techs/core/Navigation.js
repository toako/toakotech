import React from "react";
import { Container, Button, Nav, Navbar } from "react-bootstrap";

import ButtonLogin from "./ButtonLogin";

export default function Navigation() {

    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Container fluid>
            <Navbar.Brand>
                <img alt="logo" src="/res/iconlarge.png" width="30" height="30" className="d-inline-block align-top mr-1"/>{'   '}
                Toako<span style={{color: "green", fontWeight: "bold"}}>Techs</span>
            </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        <Nav.Link href="/">Mainsite</Nav.Link>
                        <Nav.Link href="/techs/dashboard">Dashboard</Nav.Link>
                    </Nav>
                    <ButtonLogin/>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}