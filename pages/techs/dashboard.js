import React from "react";
import { getSession } from "next-auth/react";
import { Col, Container, Row } from "react-bootstrap";

import Navigation from "../../components/techs/core/Navigation";
import TechsCard from "../../components/techs/core/dashboard/TechsCard";
import TechsHeader from "../../components/techs/core/TechsHeader";
import InfoPopover from "../../components/techs/core/InfoPopover";

class Dashboard extends React.Component {
    constructor (props) {
        super (props);
    }
    requireAuth = true;

    render () {
        return (<div>
            <Navigation/>
            <TechsHeader 
                page="Dashboard" 
                title="Welcome to the Techs Dashboard! Please select a tech below to begin."
                popover={<InfoPopover title="What is this?" textButton="What is this?" textBody="Techs is a library of tools for programmers in tracking their programming as well as a few tools for generating structures quickly that might be time consuming otherwise. Some Techs require a login as the data is stored and associated with your account."/>}
            />
            <Container>
                <Row className="mt-3"><Col><h3 className="text-center">Public Techs</h3></Col></Row>
                <Row>
                    <Col sm={4}>
                        <TechsCard
                            route="/techs/palette"
                            image="/res/techs/dashboard/palette.jpg"
                            title="Color Palette Generator"
                            desc="Auto-generate ranges of colors using basic color principles to be used in palettes for drawing art."
                        />
                    </Col>
                </Row>
                <Row className="my-4"><Col><h3 className="text-center">Private Techs - <i>Login Required</i></h3></Col></Row>
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

// //Redirect to login page if not logged in
// export async function getServerSideProps (context) {
//     const session = await getSession(context);
//     if (!session) return { redirect: { destination: "/techs/login", permanent: false } };
//     return { props: { session } };
// }

export default Dashboard;