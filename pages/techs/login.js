import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);

        this.state = {
            authType: "login",
            email: "",
            password: ""
        };

        this.toggleForm = this.toggleForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSumbit.bind(this);
    }

    login = async () => {
        let args = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ authType: this.state.authType, email: this.state.email, password: this.state.password })
        };
        const res = await fetch(`/api/auth/register`, args);
        const data = await res.json();
        console.log(data);
    }

    toggleForm () {
        this.setState(state => ({
            authType: state.authType == "login" ? "register" : "login"
        }));
    }

    handleChange = (e) => this.setState({[e.target.name]:e.target.value});

    handleSumbit () {
        console.log("User is attempting to " + this.state.authType + ":\n" + this.state.email + " " + this.state.password);
        this.login();
    }

    render() {
        return (<div>
            <Container>
                <Row className="my-4">
                    <Col className="text-center">
                        <p className="display-4 text-center mb-5">Please {this.state.authType} to Techs to continue.</p>
                        <hr/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4}></Col>
                    <Col xs={4}>
                        <h5>{this.state.authType == "login" ? "Please login to your account below." : "Please register an account below."}</h5><br/>
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
                            <a onClick={this.toggleForm} style={{color: "blue", cursor: "pointer"}}>{this.state.authType == "login" ? "Don't have an account? Click here to create one." : "Already have an account? Click here to login."}</a>
                        </Form>
                    </Col>
                    <Col xs={4}></Col>
                </Row>
                    
            </Container>
        </div>);
    }
}

export default Login;