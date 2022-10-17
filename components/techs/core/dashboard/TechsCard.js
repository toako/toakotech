import React from "react";
import { useRouter } from "next/router";
import { Card } from "react-bootstrap";

export default function TechsCard(props) {
    
    let styleCard={
        cursor: "pointer",
        margin: "20px auto"
    };
    
    const router = useRouter();

    function handleClick () {
        router.push(props.route);
    }
    return (
        <Card style={styleCard} onClick={handleClick}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.desc}</Card.Text>
            </Card.Body>
        </Card>
    );
}