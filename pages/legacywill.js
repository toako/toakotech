import React from "react";
import Head from 'next/head';
import '@fortawesome/fontawesome-free/js/all.js';
import styles from "../styles/legacywill.module.scss";
import { Container, Row, Col, Navbar, Nav, Tabs, Tab, Button } from "react-bootstrap";

/*
    This component serves the homepage of the website.
*/

class LegacyWill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div>
      <Head>
        <title>ToakoTech - Will's Portfolio</title>
        <link rel="icon" href="/res/icon.png" />
      </Head>
      {/* Navigation */}
      <Navbar collapseOnSelect expand="lg" fixed="top" variant="light" className={styles.navbarTT}>
        <Container>
          <Navbar.Brand className={styles.navBtn} href="#s0">
            <img
              alt=""
              src="/res/iconlarge.png"
              width="30"
              height="30"
              className="d-inline-block align-top mr-1"
            />{'   '}
            Will Kellermann
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto mr-auto">
              <Nav.Link className={styles.navBtn} href="#s1">Portfolio</Nav.Link>
              <Nav.Link className={styles.navBtn} href="#s2">Projects</Nav.Link>
              <Nav.Link className={styles.navBtn} href="#s3">Contact</Nav.Link>
              <Nav.Link className={styles.navBtn} href="https://www.github.com/toako">GitHub</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className={styles.navBtn} href="/techs/login">Techs</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ marginTop: "65px" }}></div>
      {/* Section 0 */}
      <Container className={`${styles.s0} ${styles.s0Animbg}`}>
        <Row className={styles.s0Header}>
          <Col>
            <p className={styles.s0Name}>William <br /> Burciaga <br /> Kellermann</p>
            <p className={styles.s0Summary}>Web Developer in Boise, ID</p>
          </Col>
        </Row>
        <Row className={styles.s0Subheader}>
          <Col>
            <hr className={styles.s0HR} />
            <p className={styles.s0DescText}>
              Hi! My name is William, but people usually call me Will. I am a web developer based out of
              Boise, Idaho. I spend a majority of my time coding and building my skills in all things computers, the internet, and
              e-commerce. I spend my free time building games in Unity, going to the gym, skiing, Minecraft, and kickin' it with friends.
              Programming is my passion!
            </p>
          </Col>
        </Row>
      </Container>
      <Container className={styles.s1}>
        <Row className="text-center pt-5 pb-5">
          <Col>
            <p className={styles.s1Header}>P o r t f o l i o</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className={styles.s1Title}> Certified Programmer</h1>
            <div className={styles.s1Bar} />
            <p>
              I began FreeCodeCamp in August of 2020. Though I had the ability to code and took multiple coding classes through Boise State University, I wanted to step up my
              game by reinforcing my knowledge and confidence in all things web development. For the unacquainted, FreeCodeCamp is a online coding camp that gives lessons, challenges,
              and projects in various categories of web development.
              <i> Check out my FreeCodeCamp profile <a href="https://www.freecodecamp.org/toako">here</a>.</i>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className={styles.s1Title}> Coding Skillsets</h1>
            <div className={styles.s1Bar} />
            <Tabs defaultActiveKey="mern" className="mb-3">
              <Tab eventKey="mern" title="MERN Web Development" className={styles.s1Tab}>
                React and SCSS for the front-end, Express.JS and Node.JS on the back-end, and MongoDB (& Mongoose) for storage and retrieval of data.
                In fact, this very website is built using the aforementioned libraries. I have used MERN on my website and also in my day-to-day work.
              </Tab>
              <Tab eventKey="funnel" title="Funnels & E-Commerce" className={styles.s1Tab}>
                I build sales funnels & e-commerce pages from top to bottom with metrics, retargeting, and upsells. I also
                build custom tracking tools in JS for scroll depth, user interaction, split testing, customer cookies and metrics, as well as collecting abandoned cart information. I have
                also built custom checkout forms, affiliate pages, and improved sales funnels for a few clients that are using the Clickbank affiliate marketing platform.
              </Tab>
              <Tab eventKey="game" title="Game Dev" className={styles.s1Tab}>
                I'm actively working on an unrevealed game project in Unity using C#. It is a top-down dungeon crawler that utilizes A*
                pathfinding, advanced randomly-generated regions and dungeons, and API usage for a wide range
                of items, weapons, and creatures. This is what I do in my free time and is in no way something I do professionally.
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
      <Container className={styles.s2}>
        <Row className="text-center pt-5 pb-5">
          <Col>
            <p className={styles.s2Header}>P r o j e c t s</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center text-white">
              <span className="text-danger font-weight-bold">Current Project: </span>
              <i>Unrevealed Dungeon Crawler Game</i>
            </p>
            <Button className={styles.s2Button} href="https://github.com/toako/toakotech">
              Source code for this website
            </Button>
            <Button className={styles.s2Button} href="https://www.github.com/toako">
              Browse my Github
            </Button>
            <Button className={styles.s2Button} href="https://codepen.io/toako">
              Projects on codepen.io
            </Button>
            <Button className={styles.s2Button} href="https://repl.it/@toakonguf12">
              Projects on repl.it
            </Button>
            <Button className={styles.s2Button} href="#s2-header">
              Check out progress on my game! <i>Coming soon...</i>
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className={styles.s3} id="contact">
        <Row className="text-center pt-5 pb-5">
          <Col>
            <p className={styles.s3Header}>C o n t a c t</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center">Network with me on <a className={styles.s3Link} href="https://www.linkedin.com/in/william-kellermann-078a481b7">LinkedIn</a> or <br />
              e-mail me at <a className={styles.s3Link} href="mailto:williamebk@yahoo.com">williamebk@yahoo.com</a>.</p>
            <div className={styles.s3Bar} />
            <p className={styles.s3Footer}>© 2022 ToakoTech. Website by William Burciaga Kellermann.</p>
          </Col>
        </Row>
      </Container>
    </div>);
  }
}

export default LegacyWill;
