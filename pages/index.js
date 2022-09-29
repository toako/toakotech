import React from "react";
import Head from 'next/head';
import '@fortawesome/fontawesome-free/js/all.js';

//Page components
import Navigation from "./components_index/Navigation.js";
import Greeting0 from "./components_index/Greeting0.js";
import Portfolio1 from "./components_index/Portfolio1.js";
import Projects2 from "./components_index/Projects2.js";
import Contact3 from "./components_index/Contact3.js";

/*
    This component serves the homepage of the website.
*/

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    
    render () {
        return (<div>
          <Head>
            <title>ToakoTech</title>
            <link rel="icon" href="/res/icon.png" />
          </Head>
          <Navigation/>
          <div style={{marginTop: "65px"}}></div>
          <Greeting0/>
          <Portfolio1/>
          <Projects2/>
          <Contact3/>
        </div>);
    }
}

export default Home;
