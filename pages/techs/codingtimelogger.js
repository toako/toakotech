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
const removeAllRadius = {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
};

class _CodingTimeLogger extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            status: "Default",
            timeZoneOffset: Intl.DateTimeFormat().resolvedOptions().timeZone,
            incompleteEntry: null,
            completeEntries: null,
            weeklyInsights: null,
            title: "",
            notes: "",
            newWeeklyHourGoal: 1,
            weeklyHourGoal: 1,
            editGoal: false
        }

        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleWeeklyHourGoal = this.handleWeeklyHourGoal.bind(this);
        this.editGoal = this.editGoal.bind(this);
    }

    //Fetches entry data using user session
    componentDidMount () {
        fetch(`/api/techs/ctl?username=${GlobalFunctions.removeOuterQuotations(JSON.stringify(this.props.session.data.username))}`, { method: "GET", })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    status: data.status,
                    incompleteEntry: data.incompleteEntry,
                    completeEntries: data.completeEntries,
                    weeklyInsights: data.weeklyInsights,
                    weeklyHourGoal: data.hourGoal
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
            status: data.status,
            incompleteEntry: data.incompleteEntry,
            completeEntries: data.completeEntries,
            weeklyInsights: data.weeklyInsights,
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
            status: data.status,
            incompleteEntry: data.incompleteEntry,
            completeEntries: data.completeEntries,
            weeklyInsights: data.weeklyInsights,
            title: "",
            notes: ""
        });
        console.log("Saved completed entry!");
    }

    //Handles modifying weekly goal
    async handleWeeklyHourGoal (e) {
        e.preventDefault();

        const data = await fetch(`/api/techs/ctl`, {  
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ 
                hourGoal: this.state.newWeeklyHourGoal,
                username: GlobalFunctions.removeOuterQuotations(JSON.stringify(this.props.session.data.username))
            })
        })
        .then(res => res.json())
        .catch(err => console.error(err));
        
        console.log(JSON.stringify(data));
        this.setState({
            status: data.status,
            weeklyHourGoal: data.hourGoal,
            editGoal: false
        });
        console.log("Saved completed entry!");
    }
    editGoal = () => this.setState(state => ({ editGoal: !state.editGoal }))

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
                        {this.state.status == "NoUserFound" ? <p className="text-center">To begin, enter the title of a log and start the timer to begin tracking coding time.</p> : null}
                    </Col>
                </Row>
                <Row className="mt-3 align-items-center">
                    <Col xs={12} md={9}>
                        {this.state.incompleteEntry ? (<Timer startTime={this.state.incompleteEntry.startTime}/>) : null }
                    </Col>
                    { this.state.status == "NoUserFound" ? null : (<Col className="text-center text-md-right" xs={12} md={3}>
                        { this.state.editGoal ? (
                            <Form className="mb-3 align-items-center" onSubmit={this.handleWeeklyHourGoal}>
                                <Form.Label>Modify Weekly Hours Goal To {this.state.newWeeklyHourGoal}</Form.Label>
                                <InputGroup>
                                    <Form.Control name="newWeeklyHourGoal" type="number" placeholder="25" min={1} onChange={this.handleChange} value={this.state.newWeeklyHourGoal} required/>
                                    <Button type="submit" variant="info" id="button-editGoal" style={removeAllRadius}>Modify</Button>
                                    <Button variant="danger" id="button-cancelEditGoal" style={removeLeftRadius} onClick={this.editGoal}>Cancel</Button>
                                </InputGroup>
                            </Form>
                        ) : (
                            <div>
                                <h5 className="mb-3">Weekly Goal:</h5>
                                <p>{ this.state.weeklyInsights !== null ? Math.round((this.state.weeklyInsights.weekTimeSpent / 1000 / 60 / 60) * 100) / 100 : 0 } Hours Completed</p>
                                <p className="align-items-center" style={{verticalAlign: "middle"}}>{this.state.weeklyHourGoal} Hours Goal <a className="btn btn-sm btn-info" onClick={this.editGoal}>Edit</a></p>
                            </div>
                        )}
                    </Col>)}
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>{this.state.weeklyInsights == null ? null : <h4 className="text-center">Logs This Week</h4>}</Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.weeklyInsights !== null ? this.state.weeklyInsights.thisWeeksEntries.slice(0).reverse().map(_entry => <LogItemDisplay entry={_entry} timeZoneOffset={this.state.timeZoneOffset} key={_entry.id}/>) : null}
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>{this.state.completeEntries == null ? null : <h4 className="text-center">All Logs</h4>}</Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.completeEntries ? this.state.completeEntries.slice(0).reverse().map(_entry => <LogItemDisplay entry={_entry} timeZoneOffset={this.state.timeZoneOffset} key={_entry.id}/>) : null}
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