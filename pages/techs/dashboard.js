import React from "react";
import { getSession } from "next-auth/react";
import Navigation from "../../components/techs/core/Navigation";

class Dashboard extends React.Component {
    constructor (props) {
        super (props);
    }
    requireAuth = true;

    render () {
        return (<div>
            <Navigation/>
            <h1>User is logged in!</h1>
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