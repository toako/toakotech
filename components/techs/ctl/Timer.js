import React, { useState, useEffect } from "react";
import { DateTime, Interval } from "luxon";
import { Col, Row } from "react-bootstrap";
import styles from "../../../styles/techs/ctl/Timer.module.css";

/*
Timer.js: Functional component that acts as a timer between a start time and now

Use a lot of the code found here: 
https://dev.to/yuridevat/how-to-create-a-timer-with-react-7b9 

With modification for elapsed instead of deadline and using the Luxon library
*/

export default function Timer (props) {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    //Function that handles setting the time difference between start time and now
    const getTime = () => {
        const diff = Interval.fromDateTimes(DateTime.fromISO(props.startTime).setZone("UTC"), DateTime.now().setZone("UTC"));

        setDays(Math.floor(diff.length("days")));
        setHours(Math.floor(diff.length("hours")) % 24);
        setMinutes(Math.floor(diff.length("minutes")) % 60);
        setSeconds(Math.floor(diff.length("seconds")) % 60);
    }


    //Runs every second to update the time
    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h5 className={styles.timerTitle}>Time Elapsed Since Log Started:</h5>
            <Row className={styles.timerContainer}>
                <TimerPlacard time={days} timeType={"Days"}/>
                <TimerPlacard time={hours} timeType={"Hours"}/>
                <TimerPlacard time={minutes} timeType={"Minutes"}/>
                <TimerPlacard time={seconds} timeType={"Seconds"}/>
            </Row>
        </div>
    );
}

function TimerPlacard (props) {
    return (
    <Col className={`text-center`} xs={6} sm={3}>
        <div className={styles["time" + props.timeType]}><span>{props.time}</span></div>
        <h5 className={`mt-2 mt-sm-3 mb-4 mb-sm-3`}>{props.timeType}</h5>
    </Col>
    );
}