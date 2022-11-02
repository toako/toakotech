import { DateTime, Interval } from "luxon";

/*
LogItemDisplay.js: Functional component that displays a previous task
*/

export default function LogItemDisplay (props) {
    return (
        <div>
            <h4>{props.entry.title}</h4>
            <p>{props.entry.notes}</p>
            <p>Started: {DateTime.fromISO(props.entry.startTime).setZone(props.timeZoneOffset).toLocaleString(DateTime.DATETIME_SHORT)}</p>
            <p>Ended: {DateTime.fromISO(props.entry.endTime).setZone(props.timeZoneOffset).toLocaleString(DateTime.DATETIME_SHORT)}</p>
            <p>Duration: {durationString(props.entry.startTime, props.entry.endTime)}</p>
            <hr/>
        </div>
    );
}

//Function that handles setting the time difference between start time and now
function durationString (startTime, endTime) {
    const diff = Interval.fromDateTimes(DateTime.fromISO(startTime).setZone("UTC"), DateTime.fromISO(endTime).setZone("UTC"));
    let duration = {
        days: Math.floor(diff.length("days")),
        hours: Math.floor(diff.length("hours")) % 24,
        minutes: Math.floor(diff.length("minutes")) % 60,
        days: Math.floor(diff.length("seconds")) % 60
    };
    return `${duration.days > 0 ? duration.days + " Days": ""} ${duration.hours > 0 ? duration.hours + " Hours" : ""} ${duration.minutes > 0 ? duration.minutes  + " Minutes" : ""} ${duration.seconds > 0 ? duration.seconds + " Seconds" : ""}`;
}