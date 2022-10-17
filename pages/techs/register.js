import React from "react";
import { getSession } from "next-auth/react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import TechsNav from "../../components/techs/core/Navigation.js";

class Register extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSumbit.bind(this);
    }

    handleChange = (e) => this.setState({[e.target.name]:e.target.value});

    handleSumbit = async () => {
        console.log(this.state.email + " " + this.state.password);
        let args = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: this.state.email, password: this.state.password })
        };
        const res = await fetch(`/api/register`, args);
        const data = await res.json();
        console.log(data);
    }

    render() {
        return (<div>
            <TechsNav/>
            <Container>
                <Row className="my-4">
                    <Col className="text-center">
                        <p className="display-4 text-center mb-5">Please register to access Techs.</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4}></Col>
                    <Col xs={4}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <br/><br/>
                            <a href="/techs/login">Already have an account? Click here to login.</a>
                        </Form>
                    </Col>
                    <Col xs={4}></Col>
                </Row>
            </Container>
        </div>);
    }
}

//Redirect to dashboard if logged in
export async function getServerSideProps (context) {
    const session = await getSession(context);
    if (session) return { redirect: { destination: "/techs/dashboard", permanent: false } };
    return { props: { session } };
}

export default Register;