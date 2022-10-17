import React from "react";
import { Row, Col, Container } from "react-bootstrap";

export default function TechsHeader (props) {
    return (
        <Container>
            <Row className="mt-4 mb-2">
                <Col>
                    <p className="text-secondary">Techs {">"} {props.page}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>{props.title}</h4>
                    <hr/>
                </Col>
            </Row>
        </Container>
    );
}