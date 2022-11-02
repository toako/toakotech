import React, { useState, useEffect } from "react";
import { DateTime, Interval } from "luxon";

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
            <p className="timerTitle">Time Elapsed:</p>
            {days > 0 ? <p className="timerDays"><span>{days}</span> Days</p> : null}
            {hours > 0 ? <p className="timerHours"><span>{hours}</span> Hours</p> : null}
            {minutes > 0 ? <p className="timerMinutes"><span>{minutes}</span> Minutes</p> : null}
            {seconds > 0 ? <p className="timerSeconds"><span>{seconds}</span> Seconds</p> : null}
        </div>
    );
}

function TimerPlacard (props) {
    const placardStyling = {
        textAlign: "center",
    };

    return (
    <div style={placardStyling} className={"timer" + props.TimeType}>
        <p>{props.time}</p>
        <p>{props.TimeType}</p>
    </div>
    );
}