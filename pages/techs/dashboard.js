import React from "react";
import { getSession } from "next-auth/react";
import { Col, Container, Row } from "react-bootstrap";

import Navigation from "../../components/techs/core/Navigation";
import TechsCard from "../../components/techs/core/dashboard/TechsCard";
import TechsHeader from "../../components/techs/core/TechsHeader";

class Dashboard extends React.Component {
    constructor (props) {
        super (props);
    }
    requireAuth = true;

    render () {
        return (<div>
            <Navigation/>
            <TechsHeader page="Dashboard" title="Welcome to the Techs Dashboard! Please select a tech below to begin."/>
            <Container>
                <Row>
                    <Col sm={4}>
                        <TechsCard
                            route="/techs/codingtimelogger"
                            image="/res/techs/dashboard/codingtimelogger.jpg"
                            title="Coding Time Logger"
                            desc="Keep a log of all time spent coding. Start and stop new entries and view your previous entries to see progress."
                        />
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

export default Dashboard;