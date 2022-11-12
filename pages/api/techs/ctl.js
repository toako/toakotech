//        

import mongoose from "mongoose";
import { DateTime, Interval } from "luxon";

import UserCTL from "../../../models/UserCTL";

const connectMongo = async () => mongoose.connect(process.env.MONGO_URI); //Mongoose fn() to connect to MongoDB

async function handler (req, res) {
    if (req.method == "GET") {
        try {
            console.log('DB: Attempting connection with MongoDB...');
            await connectMongo();
            console.log('DB: Connected to MongoDB');

            const userCTL = await UserCTL.findOne({username: req.query.username});
            if (userCTL) {
                return res.json({
                    status: "UserFound", 
                    incompleteEntry: filterEntries(userCTL.entries, false),
                    completeEntries: filterEntries(userCTL.entries, true),
                    weeklyInsights: getWeeklyInsights(filterEntries(userCTL.entries, true)),
                    hourGoal: userCTL.hourGoal ? userCTL.hourGoal : 1
                });
            }
            else {
                return res.json({
                    status: "NoUserFound",
                    incompleteEntry: null,
                    completeEntries: null,
                    weeklyInsights: null,
                    hourGoal: 1
                })
            }
        } catch (err) {
            console.error(err);
            return res.json({err});
        }
    }

    //POST find username with logs
    if (req.method == "POST") {
        try {
            console.log('DB: Attempting connection with MongoDB...');
            await connectMongo();
            console.log('DB: Connected to MongoDB');

            const userCTL = await UserCTL.findOne({username: req.body.username});

            /* USER FOUND */
            if (userCTL) {
                if (req.body.hourGoal) {
                    userCTL.hourGoal = req.body.hourGoal;
                    userCTL.markModified("hourGoal");
                    userCTL.save((err, savedUserCTL) => {
                        if (err) return console.error(err);
                        return res.json({
                            status: "ModifiedHourGoal", 
                            hourGoal: savedUserCTL.hourGoal
                        });
                    });
                }
                /* LOGIC FOR FINISHING ENTRY */
                else if (filterEntries(userCTL.entries, false)) {
                    const unfinishedEntryID = userCTL.entries.length - 1;
                    userCTL.entries[unfinishedEntryID].completed = true;
                    userCTL.entries[unfinishedEntryID].endTime = DateTime.now().setZone("UTC").toISO();
                    userCTL.entries[unfinishedEntryID].notes = req.body.notes;

                    userCTL.markModified("entries");
                    userCTL.save((err, savedUserCTL) => {
                        if (err) return console.error(err);
                        return res.json({
                            status: "FinishedEntry", 
                            incompleteEntry: null,
                            completeEntries: filterEntries(savedUserCTL.entries, true),
                            weeklyInsights: getWeeklyInsights(filterEntries(savedUserCTL.entries, true)),
                            hourGoal: userCTL.hourGoal ? userCTL.hourGoal : 1
                        });
                    });
                }
                /* LOGIC FOR STARTING ENTRY */
                else {
                    userCTL.entries.push(createEntry(userCTL.entries.length, req.body.title));
                    userCTL.markModified("entries");
                    userCTL.save((err, savedUserCTL) => {
                        if (err) return console.error(err);
                        return res.json({
                            status: "StartedEntry", 
                            incompleteEntry: filterEntries(savedUserCTL.entries, false),
                            completeEntries: filterEntries(savedUserCTL.entries, true),
                            weeklyInsights: getWeeklyInsights(filterEntries(savedUserCTL.entries, true)),
                            hourGoal: userCTL.hourGoal ? userCTL.hourGoal : 1
                        });
                    });
                }
            }
            /* USER NOT FOUND - ALSO START ENTRY */
            else {
                let newEntry = createEntry(0, req.body.title);
                let newUserCTL = new UserCTL({
                    username: req.body.username,
                    entries: [ newEntry ],
                    hourGoal: 1
                });
                newUserCTL.save((err, newUserCTL) => {
                    if (err) return console.error(err);
                    return res.json({
                        status: "UserCreateAndStartedEntry", 
                        incompleteEntry: filterEntries(newUserCTL.entries, false),
                        completeEntries: null,
                        weeklyInsights: null,
                        hourGoal: newUserCTL.hourGoal ? newUserCTL.hourGoal : 1
                    });
                });
            }
        } catch (err) {
            console.error(err);
            return res.json({err});
        }
    }
    else {
        return res.status(500).json({"Error": "InvalidRequestType"})
    }
}

//Gets the tasks completed this week, as well as the total time spent this week
function getWeeklyInsights(entries) {
    if (entries == null) return null;

    //Get all entries found this week
    const localTimeZone = DateTime.now().zoneName;
    const currentWeekNum = DateTime.now().weekNumber;
    const thisWeeksEntries = entries.filter(entry => DateTime.fromISO(entry.startTime).setZone(localTimeZone).weekNumber == currentWeekNum);
    console.log(thisWeeksEntries.length);

    //If no entries found this week, return null
    if (thisWeeksEntries.length == 0) {
        return {
            thisWeeksEntries: null,
            weekTimeSpent: 0
        };
    }
    else {
        //Pulls the duration from all of the completed tasks that fall within this week
        let weekTimeSpent = 0;
        for (let i = 0; i < thisWeeksEntries.length; i++) {
            let diff = Interval.fromDateTimes(DateTime.fromISO(thisWeeksEntries[i].startTime).setZone(localTimeZone), DateTime.fromISO(thisWeeksEntries[i].endTime).setZone(localTimeZone)).length();
            weekTimeSpent += diff;
        }
        return {
            thisWeeksEntries,
            weekTimeSpent
        };
    }
}

function filterEntries (entries, isCompleted) {
    let matchingEntries = entries.filter(entry => entry.completed == isCompleted); //Filters all complete or incomplete entries depending on isCompleted
    return (matchingEntries[0] ? (isCompleted ? matchingEntries : matchingEntries[0]) : null); //Returns matches, or empty object if none
}

//Format for producting a new entry
function createEntry (_id, str) {
    const dtTime = DateTime.now().setZone("UTC").toISO();
    return {
        id: _id,
        completed: false,
        startTime: dtTime,
        endTime: "",
        title: str,
        notes: ""
    }
}

export default handler;