import React from "react";
import { getSession } from "next-auth/react";

import Navigation from "../../components/techs/core/Navigation";
import TechsHeader from "../../components/techs/core/TechsHeader";

class CodingTimeLogger extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (<div>
            <Navigation/>
            <TechsHeader page="Coding Time Logger" title="Coding Time Logger: Keep track of time spent coding here."/>
        </div>);
    }
}

//Redirect to login page if not logged in
export async function getServerSideProps (context) {
    const session = await getSession(context);
    if (!session) return { redirect: { destination: "/techs/login", permanent: false } };
    return { props: { session } };
}

export default CodingTimeLogger;