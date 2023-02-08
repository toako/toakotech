import React, { useState, useEffect } from "react";
import Head from "next/head";
import MediaQuery from "react-responsive";
import { scroller } from "react-scroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faCaretLeft, faCircleNodes, faEnvelope, faFileLines, faFunnelDollar, faHandshake, faTerminal, faWrench } from '@fortawesome/free-solid-svg-icons';
import { faCodepen, faFreeCodeCamp, faGithub, faLinkedin, faSkype, faTwitch, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col, Image, Navbar, Nav } from "react-bootstrap";
import styles from "../styles/will.module.scss";

class Will extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showNavbar: false
        }
        this.handleDownload = this.handleDownload.bind(this);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        if (window.scrollY > 540) 
            this.setState({ showNavbar: true });
        else 
            this.setState({ showNavbar: false });
    };

    handleDownload() {
        const link = document.createElement('a');
        link.href = '/';
        link.download = 'WillBK_Resume.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    render() {
        return (<div className={styles.main}>
            {/* HEAD */}
            <Head>
                <title>ToakoTech - Will's Portfolio</title>
                <link rel="icon" href="/res/icon.png" />
            </Head>
            <Navbar bg="light" expand="lg" fixed="top" className={`${styles.cNavbar} ${this.state.showNavbar ? styles.fadeInDown : styles.fadeOutUp}`}>
                <Nav.Link href="/" className={styles.cLinkHome}>
                    <FontAwesomeIcon className="mr-1" size="2xl" icon={faCaretLeft} />
                    <Image src="/res/iconlarge.png" />
                </Nav.Link>
                <Navbar.Brand className={styles.cNavTitle} onClick={() => scroller.scrollTo('top', { smooth: true, offset: 0, duration: 500 })}>Will BK</Navbar.Brand>
                <Navbar.Toggle className="mx-2" style={{ borderColor: "#e2ebff" }}>
                    <img src="/res/icons/navbar_toggle_portfolio.png" alt="Navbar Toggle" />
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto mr-0 mr-md-2">
                        <Nav.Link className={styles.cNavLink} onClick={() => scroller.scrollTo('about-me', { smooth: true, offset: -70, duration: 500 })}><p>About Me</p></Nav.Link>
                        <Nav.Link className={styles.cNavLink} onClick={() => scroller.scrollTo('what-i-do', { smooth: true, offset: -70, duration: 500 })}><p>What I Do</p></Nav.Link>
                        <Nav.Link className={styles.cNavLink} onClick={() => scroller.scrollTo('skills', { smooth: true, offset: -70, duration: 500 })}><p>Skills</p></Nav.Link>
                        <Nav.Link className={styles.cNavLink} onClick={() => scroller.scrollTo('projects', { smooth: true, offset: -70, duration: 500 })}><p>Projects</p></Nav.Link>
                        <Nav.Link className={styles.cNavLink} onClick={() => scroller.scrollTo('contact', { smooth: true, offset: -70, duration: 500 })}><p>Contact Me</p></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/* Section 0 - Heading */}
            <Container id="top" className={styles.s0} fluid>
                <Row className={styles.s0Box}>
                    <Col className="align-self-center" xs={12} md={8}>
                        <p className={styles.s0Name}>William<br />Burciaga<br />Kellermann</p>
                        <p className={styles.s0Info}>Web Developer • Boise, Idaho</p>
                    </Col>
                    <Col className="align-self-center" xs={12} md={4}>
                        <div className={styles.s0SectionButton} onClick={() => scroller.scrollTo('about-me', { smooth: true, offset: -70, duration: 500 })}><p>About Me</p></div>
                        <div className={styles.s0SectionButton} onClick={() => scroller.scrollTo('what-i-do', { smooth: true, offset: -70, duration: 500 })}><p>What I Do</p></div>
                        <div className={styles.s0SectionButton} onClick={() => scroller.scrollTo('skills', { smooth: true, offset: -70, duration: 500 })}><p>Skills</p></div>
                        <div className={styles.s0SectionButton} onClick={() => scroller.scrollTo('projects', { smooth: true, offset: -70, duration: 500 })}><p>Projects</p></div>
                        <div className={styles.s0SectionButton} onClick={() => scroller.scrollTo('contact', { smooth: true, offset: -70, duration: 500 })}><p>Contact Me</p></div>
                    </Col>
                </Row>
                <div className={styles.s0Curve} />
            </Container>
            <div className={`${styles.spacer} ${styles.s0to1}`} />
            {/* Section 1 - About Me */}
            <Container id="about-me" className={styles.s1} fluid>
                <Row className={`${styles.s1TopRow} align-items-center`}>
                    <Col xs={12} sm={8} xl={9} className="pl-0">
                        <p className={styles.s1Name}>Nice to meet you! <br className={styles.s1NameBreakpoint} />My name is Will.</p>
                    </Col>
                    <Col xs={12} sm={4} xl={3} className="pr-0">
                        <Image src="/res/pixel_will_pagefit.png" alt="Pixel Will" className={styles.s1Profile} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={6} className={styles.s1ColLeft}>
                        <p className={styles.s1Title}>About Me</p>
                        <div className={styles.s1Box}>
                            <p className={styles.s1AboutMe}>
                                I am a web developer living in Boise, Idaho. I design, build, and optimize websites, sales funnels, and e-commerce storefronts
                                for businesses. With 2 years of professional experience as well as programming since I was 12, I am a professional of multiple
                                disciplines inside and outside of development.
                                <br /><br />
                                I firmly believe being a successful programmer and professional revolve around mindset and attitude and not just what you know.
                                I am driven by curiosity and achieving difficult goals. In order to get there, I work every day to become a better version
                                of myself by expanding my skills as well as gaining new perspectives from others by discussing, debating, and sharing ideas.
                            </p>
                        </div>
                    </Col>
                    <Col xs={12} lg={6} className={styles.s1ColRight}>
                        <p className={styles.s1Title}>Favorite Hobbies</p>
                        <Row className={styles.s1Box}>
                            <Col xs={12} md={6}><p className={styles.s1Fav}><img className={styles.s1FavIcon} src="/res/portfolio/games.png" />Making Video Games</p></Col>
                            <Col xs={12} md={6}><p className={styles.s1Fav}><img className={styles.s1FavIcon} src="/res/portfolio/skiing.png" />Downhill Skiing</p></Col>
                            <Col xs={12} md={6}><p className={styles.s1Fav}><img className={styles.s1FavIcon} src="/res/portfolio/cars.png" />Wrenching On Cars</p></Col>
                            <Col xs={12} md={6}><p className={styles.s1Fav}><img className={styles.s1FavIcon} src="/res/portfolio/dnd.png" />Dungeons & Dragons</p></Col>
                        </Row>

                        <p className={styles.s1Title}>Favorite Video Games</p>
                        <Row className={styles.s1Box}>
                            <Col xs={12} md={6}><p className={styles.s1Fav}><img className={styles.s1FavIcon} src="/res/portfolio/minecraft.png" />Minecraft</p></Col>
                            <Col xs={12} md={6}><p className={styles.s1Fav}><img className={styles.s1FavIcon} src="/res/portfolio/terraria.png" />Terraria</p></Col>
                            <Col xs={12} md={6}><p className={styles.s1Fav}><img className={styles.s1FavIcon} src="/res/portfolio/ps2.png" />Planetside 2</p></Col>
                            <Col xs={12} md={6}><p className={styles.s1Fav}><img className={styles.s1FavIcon} src="/res/portfolio/civ5.png" />Civilization 5</p></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <div className={`${styles.spacer} ${styles.s1to2}`} />
            {/* Section 2 - What I Do */}
            <Container id="what-i-do" className={`${styles.s2}`} fluid>
                <Row>
                    <Col>
                        <p className={`${styles.s2TextHeading}`}>
                            What I Do <br />
                        </p>
                    </Col>
                </Row>
                <Row className={`${styles.s2Row}`}>
                    <Col xs={12} lg={4}>
                        <div className={styles.s2Box}>
                            <p className={`${styles.s2FeatureTextTitle}`}><MediaQuery maxWidth={991}><FontAwesomeIcon className="mr-2" size="lg" icon={faFunnelDollar} /></MediaQuery> E-Commerce & Funnels</p>
                            <p className={`${styles.s2Icon}`}>

                                <MediaQuery minWidth={992}>
                                    <FontAwesomeIcon className="mx-auto mt-4 mb-2" size="6x" icon={faFunnelDollar} />
                                </MediaQuery>
                            </p>
                            <p className={`${styles.s2FeatureText}`}>
                                Creating e-commerce storefronts using Shopify, Wordpress, ClickFunnels or more robust solutions such as the NodeJS framework or native HTML/CSS/JS.
                                <br /><br />
                                I can build all websites from scratch or touch-up your existing websites and funnels, or fix an annoying issue that has been plaguing your website.
                            </p>
                        </div>
                    </Col>
                    <Col xs={12} lg={4} className="mt-4 mt-lg-0">
                        <div className={styles.s2Box}>
                            <p className={`${styles.s2FeatureTextTitle}`}><MediaQuery maxWidth={991}><FontAwesomeIcon className="mr-2" size="lg" icon={faHandshake} /></MediaQuery> Informational Websites</p>
                            <p className={`${styles.s2Icon}`}>
                                <MediaQuery minWidth={992}>
                                    <FontAwesomeIcon className="mx-auto mt-3 mb-1" size="6x" icon={faHandshake} />
                                </MediaQuery>
                            </p>
                            <p className={`${styles.s2FeatureText}`}>
                                Often called a <i>digital business card</i>, having an informational website can be a fantastic way for individuals to express their skills and experience or for businesses to advertise to potential clients.
                                <br /><br />
                                I build these websites with securing the customer or client in mind, designing all visual workflows and information to direct customers to your business as effectively as possible.
                            </p>
                        </div>
                    </Col>
                    <Col xs={12} lg={4} className="mt-4 mt-lg-0">
                        <div className={styles.s2Box}>
                            <p className={`${styles.s2FeatureTextTitle}`}><MediaQuery maxWidth={991}><FontAwesomeIcon className="mr-2" size="lg" icon={faCircleNodes} /></MediaQuery> Technical Solutions</p>
                            <p className={`${styles.s2Icon}`}>
                                <MediaQuery minWidth={992}>
                                    <FontAwesomeIcon className="mx-auto mt-3 mb-1" size="6x" icon={faCircleNodes} />
                                </MediaQuery>
                            </p>
                            <p className={`${styles.s2FeatureText}`}>
                                Connecting tools to your website, payment processing, implementing third-party or custom tracking solutions, as well as analyzing data and using API's.
                                <br /><br />
                                The range of API connections and setups are vast and can be a difficult puzzle to solve. Whether it's migrating existing services, adding new third-party tools, or troubleshooting existing connections, I can do it all!
                            </p>
                        </div>
                    </Col>
                </Row>
                <p className={styles.s2BottomText}>Wanting to understand more of what services I provide? <span onClick={() => scroller.scrollTo('contact', { smooth: true, offset: -70, duration: 500 })}>Go to the contact section for next steps.</span></p>
            </Container>
            <div className={`${styles.spacer} ${styles.s2to3}`} />
            {/* Section 3 - Skills */}
            <Container id="skills" className={`${styles.s3}`} fluid>
                <Row>
                    <Col>
                        <p className={`${styles.s3TextHeading}`}>
                            Skills
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6} lg={3}>
                        <div className={styles.s3Box}>
                            <p className={styles.s3SkillHeading}>Coding Abilities</p>
                            <p className={styles.s3SkillTitle}>Languages I Know:</p>
                            <p className={styles.s3SkillText}>
                                HTML, CSS, SCSS, JS, TS, C#, C, Java, Python, Git
                            </p>
                            <p className={styles.s3SkillTitle}>Libraries & Frameworks:</p>
                            <ul className={styles.s3SkillList}>
                                <li>NodeJS</li>
                                <li>ReactJS</li>
                                <li>NextJS</li>
                                <li>Express</li>
                                <li>MongoDB</li>
                                <li>Bootstrap</li>
                                <li>Terminal</li>
                                <li>GitHub</li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mt-4 mt-md-0">
                        <div className={styles.s3Box}>
                            <p className={styles.s3SkillHeading}>E-Commerce</p>
                            <p className={styles.s3SkillTitle}>Sales Platforms:</p>
                            <p className={styles.s3SkillText}>
                                Clickbank, Digistore24, Buygoods, Shopify, Wordpress, Square
                            </p>
                            <p className={styles.s3SkillTitle}>Logistics & Email:</p>
                            <p className={styles.s3SkillText}>
                                3PL Central, Extensiv, Sendlane, Konnektive, Maropost
                            </p>
                            <p className={styles.s3SkillTitle}>Tools I Use:</p>
                            <p className={styles.s3SkillText}>
                                GA3, GA4, Voluum, CBSplit, Figma
                            </p>
                            <p className={styles.s3SkillTitle}>Things I Do:</p>
                            <ul className={styles.s3SkillList}>
                                <li>Build Funnels & Storefronts</li>
                                <li>Track & Analyze User Data</li>
                                <li>Tool & API Connections</li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mt-4 mt-lg-0">
                        <div className={styles.s3Box}>
                            <p className={styles.s3SkillHeading}>Game Dev</p>
                            <p className={styles.s3SkillTitle}>Tools I Use:</p>
                            <p className={styles.s3SkillText}>
                                Unity, VSCode, Photoshop, Aseprite, Bosca Ceoil
                            </p>
                            <p className={styles.s3SkillTitle}>Things I Do:</p>
                            <ul className={styles.s3SkillList}>
                                <li>2D & 3D</li>
                                <li>Physics</li>
                                <li>Shaders</li>
                                <li>GUI's</li>
                                <li>Pixel Art</li>
                                <li>State Machines</li>
                                <li>Pathfinding</li>
                                <li>Level Design</li>
                                <li>Game Balance</li>
                                <li>...and much more</li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mt-4 mt-lg-0">
                        <div className={styles.s3Box}>
                            <p className={styles.s3SkillHeading}>Relevant Skills</p>
                            <p className={styles.s3SkillTitle}>Communication:</p>
                            <p className={styles.s3SkillText}>
                                Skype, Slack, Discord, Zoom, MS Teams, Google Meet
                            </p>
                            <p className={styles.s3SkillTitle}>Apps:</p>
                            <p className={styles.s3SkillText}>
                                Trello, Asana, Word, Excel, PowerPoint, Photoshop, Premiere
                            </p>
                            <p className={styles.s3SkillTitle}>Other Stuff:</p>
                            <ul className={styles.s3SkillList}>
                                <li>Great English Skills</li>
                                <li>2 Years of Sales Experience</li>
                                <li>Linux, Servers, & VPS</li>
                                <li>Writing SOP's & Guidelines</li>
                                <li>Writing Documentation</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <p className={styles.s3BottomText}>
                    I can do all of the above to an intermediate to advanced level. I have an <i>"I can figure it out!"</i> attitude for learning unfamiliar technology
                    and tools and I am constantly building and reinforcing my knowledge and experience. There is more I have messed around with before, but I
                    cannot do it at a level that I could say, <i>"oh yeah, I know that, let's put it on this list."</i> Humility and honesty, folks!
                </p>
            </Container>
            <div className={`${styles.spacer} ${styles.s3to4}`} />
            {/* Section 4 - Projects */}
            <Container id="projects" className={styles.s4} fluid>
                <Row>
                    <Col xs={12}>
                        <p className={styles.s4TextHeading}>Projects</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6} md={4} className="p-0 px-sm-1 py-sm-3 p-lg-3">
                        <div className={`${styles.s4LinkBox}`} onClick={(e) => { e.preventDefault(); window.location.href = "https://www.freecodecamp.com/toako" }}>
                            <p className={styles.s4LinkIcon}><FontAwesomeIcon className="pr-1 pt-1" size="xl" icon={faArrowUpRightFromSquare} /></p>
                            <p className={`${styles.s4LinkTitle}`}><FontAwesomeIcon className="mr-3" size="sm" icon={faFreeCodeCamp} />FreeCodeCamp</p>
                            <p className={styles.s4LinkDesc}>I have multiple completed certifications from FreeCodeCamp in HTML, CSS, JS, NodeJS, & Python.</p>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={4} className="p-0 px-sm-1 py-sm-3 p-lg-3">
                        <div className={`${styles.s4LinkBox}`} onClick={(e) => { e.preventDefault(); window.location.href = "https://www.github.com/toako" }}>
                            <p className={styles.s4LinkIcon}><FontAwesomeIcon className="pr-1 pt-1" size="xl" icon={faArrowUpRightFromSquare} /></p>
                            <p className={`${styles.s4LinkTitle}`}><FontAwesomeIcon className="mr-3" size="sm" icon={faGithub} />GitHub</p>
                            <p className={styles.s4LinkDesc}>All of my larger project repositories, including this website, are located on Github. Check it out!</p>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={4} className="p-0 px-sm-1 py-sm-3 p-lg-3">
                        <div className={`${styles.s4LinkBox}`} onClick={(e) => { e.preventDefault(); window.location.href = "/techs" }}>
                            <p className={styles.s4LinkIcon}><FontAwesomeIcon className="pr-1 pt-1" size="xl" icon={faArrowUpRightFromSquare} /></p>
                            <p className={`${styles.s4LinkTitle}`}><FontAwesomeIcon className="mr-3" size="sm" icon={faWrench} />Techs & Demos</p>
                            <p className={styles.s4LinkDesc}>I have created multiple techs and demos demonstrating my skills, as well as being useful coding tools.</p>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={4} className="p-0 px-sm-1 py-sm-3 p-lg-3">
                        <div className={`${styles.s4LinkBox}`} onClick={(e) => { e.preventDefault(); window.location.href = "https://codepen.io/toako" }}>
                            <p className={styles.s4LinkIcon}><FontAwesomeIcon className="pr-1 pt-1" size="xl" icon={faArrowUpRightFromSquare} /></p>
                            <p className={`${styles.s4LinkTitle}`}><FontAwesomeIcon className="mr-3" size="sm" icon={faCodepen} />Codepen</p>
                            <p className={styles.s4LinkDesc}>Several projects demonstrating my abilities to use libraries such as D3.js as well as some other demos.</p>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={4} className="p-0 px-sm-1 py-sm-3 p-lg-3">
                        <div className={`${styles.s4LinkBox}`} onClick={(e) => { e.preventDefault(); window.location.href = "https://replit.com/@toakonguf12" }}>
                            <p className={styles.s4LinkIcon}><FontAwesomeIcon className="pr-1 pt-1" size="xl" icon={faArrowUpRightFromSquare} /></p>
                            <p className={`${styles.s4LinkTitle}`}><FontAwesomeIcon className="mr-3" size="sm" icon={faTerminal} />Repl.it</p>
                            <p className={styles.s4LinkDesc}>Several projects demonstrating my abilities in data science with Python as well as some other demos.</p>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={4} className="p-0 px-sm-1 py-sm-3 p-lg-3">
                        <div className={`${styles.s4LinkBox}`} onClick={this.handleDownload}>
                            <p className={styles.s4LinkIcon}><FontAwesomeIcon className="pr-1 pt-1" size="xl" icon={faArrowUpRightFromSquare} /></p>
                            <p className={`${styles.s4LinkTitle}`}><FontAwesomeIcon className="mr-3" size="sm" icon={faFileLines} />Resume</p>
                            <p className={styles.s4LinkDesc}>The very same resume I would hand you at an interview, click to download my current resume to learn all about me.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className={`${styles.spacer} ${styles.s4to5}`} />
            {/* Section 5 - Contact */}
            <Container id="contact" className={styles.s5} fluid>
                <Row className="align-items-center">
                    <Col xs={12} md={7} lg={8} xl={9}>
                        <p className={styles.s5TextHeading}>Let's work together to build your next <br className={styles.s5TextHeadingBR} /><TextSwitcher time={2000} /></p>
                        <p className={styles.s5TextDesc}>Feel free to reach out if you want to discuss opportunities, need consulting, have questions, or looking to network. I will get back to you as soon as I am available.</p>
                    </Col>
                    <Col xs={12} md={5} lg={4} xl={3}>
                        <div className={styles.s5Links}>
                            <a href="mailto:williamebk@gmail.com"><p>Email <FontAwesomeIcon className="ml-2" icon={faEnvelope} /></p></a>
                            <a href="https://www.github.com/toako"><p>GitHub <FontAwesomeIcon className="ml-2" icon={faGithub} /></p></a>
                            <a href="https://www.linkedin.com/in/william-kellermann-078a481b7/"><p>Linked<FontAwesomeIcon className="ml-1" size="lg" icon={faLinkedin} /></p></a>
                            <a href="https://twitter.com/WillKellermann"><p>Twitter <FontAwesomeIcon className="ml-2" icon={faTwitter} /></p></a>
                            <a href="https://www.twitch.tv/toakotech"><p>Twitch <FontAwesomeIcon className="ml-2" icon={faTwitch} /></p></a>
                            <a href="https://join.skype.com/invite/owbh7dDNDIQ1"><p>Skype <FontAwesomeIcon className="ml-2" icon={faSkype} /></p></a>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* Footer */}
            <div className={styles.footer}>
                <Container>
                    <Row className="align-items-center py-5">
                        <Col xs={12} md={4}>
                            <Image src="/res/logos/ToakoTech_PurpleOrange.png" alt="Logo" className={styles.footerLogo} />
                        </Col>
                        <Col xs={6} md={2} className="my-3 my-md-0">
                            <p className={styles.footerLinkText}>
                                <a href="/will" className={styles.footerLink}>Homepage</a><br />
                                <a href="/techs" className={styles.footerLink}>Techs</a>
                            </p>
                        </Col>
                        <Col xs={6} md={2} className="my-3 my-md-0">
                            <p className={styles.footerLinkText}>
                                <a href="#" className={styles.footerLinkDisabled} disabled>Interim</a><br />
                                <a href="#" className={styles.footerLinkDisabled} disabled>Blog</a>
                            </p>
                        </Col>
                        <Col xs={12} md={4}>
                            <p className={styles.footerText}>
                                &copy; 2023 ToakoTech. All Rights Reserved.<br />
                                By William Burciaga Kellermann.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>);
    }
}

//Functional component that toggles between different text content (used in the Contact Section)
const TextSwitcher = (props) => {
    const [text, setText] = useState(null);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFadeOut(true);
            setTimeout(() => {
                setText(prevText => {
                    const texts = ['Website…', 'Sales Funnel…', 'Storefront…', 'Web App…'];
                    const currentIndex = texts.indexOf(prevText);
                    const nextIndex = (currentIndex + 1) % texts.length;
                    return texts[nextIndex];
                });
                setFadeOut(false);
            }, 500);
        }, props.time);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <span className={`${styles.s5FadeText} ${fadeOut ? styles.s5FadeTextOut : styles.s5FadeTextIn}`}>{text}</span>
    );
};

export default Will;