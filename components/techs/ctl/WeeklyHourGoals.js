import React from "react";

export default function WeeklyHourGoals (props) {
    let hoursCompleted = Math.round((props.timeSpent / 1000 / 60 / 60) * 100) / 100;
    let percentCompleted = Math.round((((props.timeSpent / 1000 / 60 / 60) / props.hourGoal) * 100) / 100);

    return(<div>
        <h5 className="mb-3">Weekly Coding Hour Goal</h5>
        <p className="align-items-center" style={{verticalAlign: "middle"}}>{props.hourGoal} Hours Goal <a className="btn btn-sm btn-info" onClick={props.editGoal}>Edit</a></p>
        <p>{hoursCompleted} Hours Completed</p>
        <p>{percentCompleted}% There!</p>
    </div>)
}