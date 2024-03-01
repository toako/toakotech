import React from "react";
import Head from "next/head";
import MediaQuery from "react-responsive";
import { scroller } from "react-scroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleNodes, faCode, faComments, faFunnelDollar, faGamepad, faHandshake, faWrench } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Image, Button, Navbar, Nav } from "react-bootstrap";
import styles from "../styles/toakotech.module.scss";

//Component imports
import GlobalFunctions from "../lib/GlobalFunctions";

// interimPointsList is information used in section 3 to denote different bullet point features of Interim
const interimPointsList = [
    ["/res/interim/icon_map.jpg", "Explore the Realm", "A large realm with bizarre lands to explore & conquer to make the grind fresh & interesting!"],
    ["/res/interim/icon_players.jpg", "Single/Multiplayer", "Play alone or join comrades in up to 4 player CO-OP to enjoy the experience with others."],
    ["/res/interim/icon_classes.png", "Multiple Classes", "Multiple classes with powerful abilities, upgrade trees, and weapons to create a unique game experience."],
    ["/res/interim/icon_dungeon.png", "Crawl Dungeons", "All regions contain challenging, randomly generated dungeons with unique themes, enemies and traps."],
    ["/res/interim/icon_loot.png", "All the Loot!", "Tons of items and equipment in the form of eye candy to use, upgrade, and customize your character."],
    ["/res/interim/icon_enemy.png", "Bad Guys", "Tough monsters with advanced combat mechanics, personality, and loot that want you dead!"],
    ["/res/interim/icon_npc.png", "A Living World", "NPC's that sell items and can be interacted with that make the world feel alive."],
    ["/res/interim/icon_story.png", "Storied Immersion", "A rich story that immerses you in the realm you have been subjected to against your will."],
    ["/res/interim/icon_combat.png", "Advanced Combat", "Intuitive combat mechanics that are easy to use, but allow for a high skill ceiling that grows as you level up."]
];

class ToakoTech extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTopLogo: false
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        this.setState({ showTopLogo: window.scrollY > 400 }); //Change value to adjust y-level it toggles at
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (<div className={`${styles.main}`}>
            {/* HEAD */}
            <Head>
                <title>ToakoTech - Home</title>
                <link rel="icon" href="/res/icon.png" />
            </Head>
            {/* Navbar */}
            <Navbar expand="lg" className={`${styles.cNavbar}`} sticky="top">
                <Image src="/res/logos/ToakoTech_PurpleOrange.png" alt="Logo" className={`navbar-logo ${this.state.showTopLogo ? styles.visibleNavLogo : styles.hiddenNavLogo} ${styles.cNavbarLogo}`} />
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginLeft: "5px", border: "none"}}>
                    <img src="/res/icons/navbar_toggle.png" alt="Navbar Toggle" className="cNavbarToggleIcon"/>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav" style={{backgroundColor: "#292929", padding: "20px 7.5px", width: "110%"}}>
                    <Nav className="mr-auto">
                        <Nav.Link href="/will" className={`${styles.cNavbarLinkLeft}`}>Will's Portfolio</Nav.Link>
                        <Nav.Link href="/will#contact" className={`${styles.cNavbarLinkLeft}`}>Contact</Nav.Link>
                        <Nav.Link href="https://www.github.com/toako" className={`${styles.cNavbarLinkLeft}`}>Github</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="#link" className={`${styles.cNavbarLinkRightDisabled}`} disabled>Interim</Nav.Link>
                        <Nav.Link href="#link" className={`${styles.cNavbarLinkRightDisabled}`} disabled>Blog</Nav.Link>
                        <Nav.Link href="/techs" className={`${styles.cNavbarLinkRight}`}>Techs & Demos</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/* Section 1 - Heading */}
            <Container className={`${styles.heading}`} fluid>
                <div className={styles.headingContentBox}>
                    <img src="/res/logos/ToakoTech_PurpleOrange_Large.png" alt="toakotechlogo" className={`${styles.headingLogo}`} />
                    <p className={styles.headingText}>
                        A game and web development nexus.<br />Created by William Kellermann.
                    </p>
                    <a className={styles.headingButton} href="/will">VIEW MY PROFESSIONAL CODING PORTFOLIO <FontAwesomeIcon className="pl-2" size="sm" icon={faArrowRight} /></a>
                </div>
            </Container>
            {/* Section 2 - Featured */}
            <Container className={`${styles.s2}`} fluid>
                <Row>
                    <Col>
                        <p className={`${styles.s2TextHeading}`}>
                            ToakoTech is my vision for the future in all things code. <br />
                        </p>
                        <div className={`${styles.s2TextHeadingBar}`}></div>
                        <p className={`${styles.s2TextSubHeading}`}>
                            In it's current iteration, it is the web-based foundation for which all of my creations will be implemented and showcased. <br className={styles.s2Br}/>
                            Check back every now and then to see new developments in multiple categories.
                        </p>

                    </Col>
                </Row>
                <Row ref={this.topLogoTargetRef} className={`${styles.s2FeatureRow}`}>
                    <Col xs={12} lg={4} className="mb-3 mb-lg-0">
                        <div className={`${styles.s2FeatureBox} ${styles.s2Blue}`} onClick={() => scroller.scrollTo('s3', { smooth: true, offset: -100, duration: 500 })}>
                            <p className={`${styles.s2FeatureTextTitle}`}><MediaQuery maxWidth={992}><FontAwesomeIcon className="mr-3" icon={faGamepad} /></MediaQuery> Video Games</p>
                            <p className={`${styles.s2FeatureText}`}>
                                <MediaQuery minWidth={993}>
                                    <FontAwesomeIcon className="mx-auto my-5" size="8x" icon={faGamepad} />
                                </MediaQuery>
                                <br />
                                Game development is the primary vision for ToakoTech.
                                I am currently building a 2D-topdown game in Unity.
                                <br /><br /><span>COMING SOON</span>
                            </p>
                        </div>
                    </Col>
                    <Col xs={12} lg={4} className="mb-3 mb-lg-0">
                        <div className={`${styles.s2FeatureBox} ${styles.s2Orange}`} onClick={(e) => {e.preventDefault(); window.location.href="/techs"}}>
                            <p className={`${styles.s2FeatureTextTitle}`}><MediaQuery maxWidth={992}><FontAwesomeIcon className="mr-3" icon={faWrench} /></MediaQuery> Demos & Tools</p>
                            <p className={`${styles.s2FeatureText}`}>
                                <MediaQuery minWidth={993}>
                                    <FontAwesomeIcon className="mx-auto my-5" size="8x" icon={faWrench} />
                                </MediaQuery>
                                <br/>
                                A library of utility-based tools for development & content creation for making the daily grind easier.
                                <br /><br /><span>LEARN MORE</span>
                            </p>
                        </div>
                    </Col>
                    <Col xs={12} lg={4} >
                        <div className={`${styles.s2FeatureBox} ${styles.s2Green}`} onClick={() => scroller.scrollTo('s4', { smooth: true, offset: -100, duration: 500 })}>
                            <p className={`${styles.s2FeatureTextTitle}`}><MediaQuery maxWidth={992}><FontAwesomeIcon className="mr-3" icon={faCode} /></MediaQuery> Web Development</p>
                            <p className={`${styles.s2FeatureText}`}>
                                <MediaQuery minWidth={993}>
                                    <FontAwesomeIcon className="mx-auto my-5" size="8x" icon={faCode} />
                                </MediaQuery>
                                <br />
                                From building e-commerce websites, technical solutions, as well as informational sites.
                                <br /><br /><span>LEARN MORE</span>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* Section 3 - Interim 
            <Container id="s3" className={`${styles.s3}`} fluid>
                <Row>
                    <Col>
                        <Image src="/res/logos/InterimLogo.png" alt="interim-logo" className={`${styles.s3Logo}`} />
                        <p className={`${styles.s3Heading}`}>
                            Interim is an indie 2D-topdown adventure dungeon crawler built <br className={styles.brHideMobile}/>in Unity spanning across several unique & otherworldly regions.
                        </p>
                        <div className={`${styles.s3HeadingBar}`}></div>
                    </Col>
                </Row>
                <Row>
                    {interimPointsList.map((point, index) => <InterimFeature image={point[0]} title={point[1]} text={point[2]} key={index}/>)}
                </Row>
                <Row>
                    <Col>
                        <div className={`${styles.s3HeadingBar}`}></div>
                        <p className={`${styles.s3Bottom}`}>
                            <i>Interim is in early development and built in my free time.</i> <br />Stay tuned for a dedicated development page, blog posts, and dev livestreams in the future.
                        </p>
                    </Col>
                </Row>
            </Container>*/}
            {/* Section 4 - Web Development */}
            <Container id="s4" className={`${styles.s4}`} fluid>
                <Row>
                    <Col>
                        <p className={`${styles.s4TextHeading}`}>
                            Web Development <br />
                        </p>
                        <div className={`${styles.s4TextHeadingBar}`}></div>
                        <p className={`${styles.s4TextSubHeading}`}>
                            I build professional websites and utilize leading web tools.<br />
                            <Button href="/will#contact">LET'S GET IN TOUCH <FontAwesomeIcon className="pl-2" size="sm" icon={faComments} /></Button>
                        </p>
                    </Col>
                </Row>
                <Row className={`${styles.s4Row}`}>
                    <Col className={styles.s4Column} xs={12} md={4}>
                        <p className={`${styles.s4FeatureTextTitle}`}>E-Commerce & Funnels</p>
                        <p className={`${styles.s4Icon}`}>
                            <MediaQuery maxWidth={992}>
                                <FontAwesomeIcon className="mx-auto mt-4 mb-2" size="4x" icon={faFunnelDollar}/>
                            </MediaQuery>
                            <MediaQuery minWidth={993}>
                                <FontAwesomeIcon className="mx-auto mt-4 mb-2" size="8x" icon={faFunnelDollar}/>
                            </MediaQuery>
                        </p>
                        <p className={`${styles.s4FeatureText}`}>
                            Creating e-commerce storefronts using Shopify, Wordpress, or more robust solutions such as the NodeJS framework or native HTML/CSS/JS.
                        </p>
                    </Col>
                    <Col className={styles.s4Column} xs={12} md={4}>
                        <p className={`${styles.s4FeatureTextTitle}`}>Informational Websites</p>
                        <p className={`${styles.s4Icon}`}>
                            <MediaQuery maxWidth={992}>
                                <FontAwesomeIcon className="mx-auto mt-3 mb-1" size="4x" icon={faHandshake}/>
                            </MediaQuery>
                            <MediaQuery minWidth={993}>
                                <FontAwesomeIcon className="mx-auto mt-3 mb-1" size="8x" icon={faHandshake}/>
                            </MediaQuery>
                        </p>
                        <p className={`${styles.s4FeatureText}`}>
                            Often called a <i>digital business card</i>, having an informational website can be a fantastic way for individuals to express their skills and experience or for businesses to advertise to potential clients.
                        </p>
                    </Col>
                    <Col className={styles.s4Column} xs={12} md={4}>
                        <p className={`${styles.s4FeatureTextTitle}`}>Technical Solutions</p>
                        <p className={`${styles.s4Icon}`}>
                            <MediaQuery maxWidth={992}>
                                <FontAwesomeIcon className="mx-auto mt-3 mb-1" size="4x" icon={faCircleNodes}/>
                            </MediaQuery>
                            <MediaQuery minWidth={993}>
                                <FontAwesomeIcon className="mx-auto mt-3 mb-1" size="8x" icon={faCircleNodes}/>
                            </MediaQuery>
                        </p>
                        <p className={`${styles.s4FeatureText}`}>
                            Connecting third-party tools to your website, implementing third-party or custom tracking solutions, as well as analyzing data and using API's.
                        </p>
                    </Col>
                </Row>
            </Container>
            {/* Footer */}
            <Container>
                <Row className="align-items-center py-5">
                    <Col xs={12} md={4}>
                        <Image src="/res/logos/ToakoTech_PurpleOrange.png" alt="Logo" className={styles.footerLogo} />
                    </Col>
                    <Col xs={6} md={2} className="my-3 my-md-0">
                        <p className={styles.footerLinkText}>
                            <a href="/will" className={styles.footerLink}>Will's Portfolio</a><br/>
                            <a href="/will#contact" className={styles.footerLink}>Contact</a><br/>
                            <a href="https://www.github.com/toako" className={styles.footerLink}>Github</a>
                        </p>
                    </Col>
                    <Col xs={6} md={2} className="my-3 my-md-0">
                        <p className={styles.footerLinkText}>
                            <a href="#" className={styles.footerLinkDisabled} disabled>Interim</a><br/>
                            <a href="#" className={styles.footerLinkDisabled} disabled>Blog</a><br/>
                            <a href="/techs" className={styles.footerLink}>Techs</a>
                        </p>
                    </Col>
                    <Col xs={12} md={4}>
                        <p className={styles.footerText}>
                            &copy; 2023 ToakoTech. All Rights Reserved.<br/>
                            By William Burciaga Kellermann.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}

// InterimFeature is a simple functional component used in section 3 to be a skeleton for a bullet point feature of Interim
function InterimFeature(props) {
    return (
        <Col xs={12} md={6} lg={4} className={styles.s3Column}>
            <Row className={`${styles.s3PointBox} my-3 align-items-center`}>
                <Col xs={3}><Image src={props.image} alt="itemimage" className={`${styles.s3PointImage}`} /></Col>
                <Col xs={9} className="py-3 py-sm-0"><p className={`${styles.s3PointTitle}`}>{props.title}</p><p className={`${styles.s3Point} ${styles.s3TextMobile}`}>{props.text}</p></Col>
                <Col xs={12} className={styles.s3TextDesktop}><p className={`${styles.s3Point}`}>{props.text}</p></Col>
            </Row>
        </Col>
    );
}

export default ToakoTech;