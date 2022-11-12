import { DateTime, Interval } from "luxon";
import { Col, Row } from "react-bootstrap";
import chroma from "chroma-js";
import styles from "../../../styles/LogItemDisplay.module.css";

/*
LogItemDisplay.js: Functional component that displays a previous task
*/

export default function LogItemDisplay (props) {
    return (
        <Row style={{backgroundColor: colorFromDuration(props.entry.startTime, props.entry.endTime)}} className={`align-items-center ${styles.logItemDisplay}`}>
            <Col xs={12} sm={4}>
                <p className={styles.title}>{props.entry.title}</p>
                <p className={styles.notes}>{props.entry.notes}</p>
            </Col>
            <Col xs={12} sm={4}>
                <p className={styles.duration}>{durationString(props.entry.startTime, props.entry.endTime)}</p>
            </Col>
            <Col xs={12} sm={4}>
                <p className={styles.timeStart}><u>Started:</u> {DateTime.fromISO(props.entry.startTime).setZone(props.timeZoneOffset).toLocaleString(DateTime.DATETIME_SHORT)}</p>
                <p className={styles.timeEnd}><u>Ended:</u> {DateTime.fromISO(props.entry.endTime).setZone(props.timeZoneOffset).toLocaleString(DateTime.DATETIME_SHORT)}</p>
            </Col>
        </Row>
    );
}

//Uses chroma library to produce a color along a gradient that will be the background for the completed task
function colorFromDuration (startTime, endTime) {
    let diff = Interval.fromDateTimes(DateTime.fromISO(startTime).setZone("UTC"), DateTime.fromISO(endTime).setZone("UTC")).length();
    if (diff > 86400000) diff = 86400000;
    const scale = chroma.scale(["#B476BF","#E59380"]);
    return scale(diff / 86400000).hex();
}

//Function that handles setting the time difference between start time and now
function durationString (startTime, endTime) {
    const diff = Interval.fromDateTimes(DateTime.fromISO(startTime).setZone("UTC"), DateTime.fromISO(endTime).setZone("UTC"));
    let duration = {
        days: Math.floor(diff.length("days")),
        hours: Math.floor(diff.length("hours")) % 24,
        minutes: Math.floor(diff.length("minutes")) % 60,
        seconds: Math.floor(diff.length("seconds")) % 60
    };
    return `${duration.days > 0 ? duration.days + " Days": ""} ${duration.hours > 0 ? duration.hours + " Hours" : ""} ${duration.minutes > 0 ? duration.minutes  + " Minutes" : ""} ${ duration.seconds + " Seconds"}`;
}