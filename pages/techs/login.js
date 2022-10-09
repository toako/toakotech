import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login = async () => {
        let args = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, method: "GET" };
        const res = await fetch(`/api/techs/login`, args);
        const data = await res.json();
        console.log(data);
    }
    componentDidMount () {
        this.login();
    }
    render () {
        return (<div>
            <h1>Test</h1>
        </div>);
    }
}

export default Login;