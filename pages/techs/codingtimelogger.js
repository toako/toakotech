import React from "react";
import { DateTime } from "luxon";
import { getSession } from "next-auth/react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";

import GlobalFunctions from "../../lib/GlobalFunctions";

import withSession from "../../components/techs/core/WithSession"; //Wrapper function component for passing session to this component
import Navigation from "../../components/techs/core/Navigation";
import TechsHeader from "../../components/techs/core/TechsHeader";
import Timer from "../../components/techs/ctl/Timer";
import LogItemDisplay from "../../components/techs/ctl/LogItemDisplay";

const removeLeftRadius = {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
};

class _CodingTimeLogger extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            timeZoneOffset: Intl.DateTimeFormat().resolvedOptions().timeZone,
            incompleteEntry: null,
            completeEntries: null,
            title: "",
            notes: ""
        }

        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }

    //Fetches entry data using user session
    componentDidMount () {
        fetch(`/api/techs/ctl?username=${GlobalFunctions.removeOuterQuotations(JSON.stringify(this.props.session.data.username))}`, { method: "GET", })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    incompleteEntry: data.incompleteEntry,
                    completeEntries: data.completeEntries
                });
            })
            .catch(err => console.error(err));
    }

    handleChange = (e) => this.setState({[e.target.name]:e.target.value});

    //Handles starting an entry/log
    async handleStart (e) {
        e.preventDefault();

        const data = await fetch(`/api/techs/ctl`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                title: this.state.title, 
                username: GlobalFunctions.removeOuterQuotations(JSON.stringify(this.props.session.data.username)) 
            }) 
        })
        .then(res => res.json())
        .catch(err => console.error(err));
        
        console.log(JSON.stringify(data));
        this.setState({
            incompleteEntry: data.incompleteEntry,
            completeEntries: data.completeEntries,
            title: "",
            notes: ""
        });
        console.log("Started new entry!");
    }

    //Handles stopping an entry/log
    async handleStop (e) {
        e.preventDefault();

        const data = await fetch(`/api/techs/ctl`, {  
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ 
                notes: this.state.notes,
                username: GlobalFunctions.removeOuterQuotations(JSON.stringify(this.props.session.data.username))
            })
        })
        .then(res => res.json())
        .catch(err => console.error(err));
        
        console.log(JSON.stringify(data));
        this.setState({
            incompleteEntry: data.incompleteEntry,
            completeEntries: data.completeEntries,
            title: "",
            notes: ""
        });
        console.log("Saved completed entry!");
    }

    render () {
        return (<div>
            <Navigation/>
            <TechsHeader page="Coding Time Logger" title="Coding Time Logger: Keep track of time spent coding here."/>
            <Container>
                <Row>
                    <Col>
                        { this.state.incompleteEntry ? (
                            <Form className="mb-3 align-items-center" onSubmit={this.handleStop}>
                                <Form.Label>Log Exit Notes</Form.Label>
                                <InputGroup>
                                    <Form.Control name="notes" placeholder="ie. Next time, implement unit tests" onChange={this.handleChange} value={this.state.notes} required/>
                                    <Button type="submit" variant="danger" id="button-stop" style={removeLeftRadius}>Stop Timer</Button>
                                </InputGroup>
                            </Form>
                        ) : (
                            <Form className="mb-3 align-items-center" onSubmit={this.handleStart}>
                                <Form.Label>Coding Log Title</Form.Label>
                                <InputGroup>
                                    <Form.Control name="title" placeholder="ie. Fixing Bugs" onChange={this.handleChange} value={this.state.title} required/>
                                    <Button type="submit" variant="success" id="button-start" style={removeLeftRadius}>Start Timer</Button>
                                </InputGroup>
                            </Form>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col> 
                        {this.state.incompleteEntry ? <Timer startTime={this.state.incompleteEntry.startTime}/> : <p>Status: No Active Entry</p>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.completeEntries ? this.state.completeEntries.map(_entry => <LogItemDisplay entry={_entry} timeZoneOffset={this.state.timeZoneOffset}/>) : null}
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