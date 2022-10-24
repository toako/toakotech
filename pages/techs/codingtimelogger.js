import React from "react";
import { DateTime } from "luxon";
import { getSession } from "next-auth/react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";

import GlobalFunctions from "../../lib/GlobalFunctions";

import withSession from "../../components/techs/core/WithSession"; //Wrapper function component for passing session to this component
import Navigation from "../../components/techs/core/Navigation";
import TechsHeader from "../../components/techs/core/TechsHeader";
import { useEffect } from "react";

const removeLeftRadius = {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
};

class _CodingTimeLogger extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            timeZoneOffset: "",
            activeLog: false,
            activeLogTitle: "",
            startTime: "",
            title: "",
            notes: ""
        }

        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }

    componentDidMount() {
        fetch(`/api/techs/ctl?username=${GlobalFunctions.removeOuterQuotations(JSON.stringify(this.props.session.data.username))}`, { method: "GET", })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.unfinishedEntry) {
                    this.setState({activeLog: true, startTime: data.unfinishedEntry.startTime, activeLogTitle: data.unfinishedEntry.title});
                }
            })
            .catch(err => console.error(err));
    }

    handleChange = (e) => this.setState({[e.target.name]:e.target.value});

    async handleStart (e) {
        e.preventDefault();
        await fetch(`/api/techs/ctl`, {  
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ title: this.state.title, username: GlobalFunctions.removeOuterQuotations(JSON.stringify(this.props.session.data.username)) }) 
        })
        .then(res => res.json())
        .then(data => {
            console.log(JSON.stringify(data));
            this.setState({
                activeLog: true,
                startTime: data.startTime
            });
            console.log("Started new entry!");
        })
        .catch(err => console.error(err));
    }

    async handleStop (e) {
        e.preventDefault();
        await fetch(`/api/techs/ctl`, {  
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ username: GlobalFunctions.removeOuterQuotations(JSON.stringify(this.props.session.data.username)), notes: this.state.notes}) 
        })
        .then(res => res.json())
        .then(data => {
            console.log(JSON.stringify(data));
            this.setState({
                activeLog: false,
                activeLogTitle: "",
                startTime: "",
                title: "",
                notes: ""
            });
            console.log("Saved completed entry!");
        })
        .catch(err => console.error(err));
    }

    render () {
        return (<div>
            <Navigation/>
            <TechsHeader page="Coding Time Logger" title="Coding Time Logger: Keep track of time spent coding here."/>
            <Container>
                <Row>
                    <Col>
                        { this.state.activeLog ? (
                            <Form className="mb-3 align-items-center" onSubmit={this.handleStop}>
                                <Form.Label>Log Exit Notes</Form.Label>
                                <InputGroup>
                                    <Form.Control name="notes" placeholder="ie. Next time, implement unit tests" onChange={this.handleChange} value={this.state.notes}/>
                                    <Button type="submit" variant="danger" id="button-stop" style={removeLeftRadius}>Stop Timer</Button>
                                </InputGroup>
                            </Form>
                        ) : (
                            <Form className="mb-3 align-items-center" onSubmit={this.handleStart}>
                                <Form.Label>Coding Log Title</Form.Label>
                                <InputGroup>
                                    <Form.Control name="title" placeholder="ie. Fixing Bugs" onChange={this.handleChange} value={this.state.title}/>
                                    <Button type="submit" variant="success" id="button-start" style={removeLeftRadius}>Start Timer</Button>
                                </InputGroup>
                            </Form>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>{this.state.activeLogTitle}</p>
                        <p>{this.state.startTime}</p>
                        <p>{GlobalFunctions.removeOuterQuotations(JSON.stringify(this.props.session.data.username))}</p>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}

//Redirect to login page if not logged in
export async function getServerSideProps (context) {
    const session = await getSession(context);
    if (!session) return { redirect: { destination: "/techs/login", permanent: false } };
    return { props: { session } };
}

const CodingTimeLogger = withSession(_CodingTimeLogger);
export default CodingTimeLogger;