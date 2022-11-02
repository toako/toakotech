//        

import mongoose from "mongoose";
import { DateTime } from "luxon";

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
                    completeEntries: filterEntries(userCTL.entries, true)
                });
            }
            else {
                return res.json({status: "NoUserFound"})
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
                /* LOGIC FOR FINISHING ENTRY */
                if (filterEntries(userCTL.entries, false)) {
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
                            completeEntries: filterEntries(savedUserCTL.entries, true)
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
                            completeEntries: filterEntries(savedUserCTL.entries, true)
                        });
                    });
                }
            }
            /* USER NOT FOUND - ALSO START ENTRY */
            else {
                let newEntry = createEntry(0, req.body.title);
                let newUserCTL = new UserCTL({
                    username: req.body.username,
                    entries: [ newEntry ]
                });
                newUserCTL.save((err, newUserCTL) => {
                    if (err) return console.error(err);
                    return res.json({
                        status: "UserCreateAndStartedEntry", 
                        incompleteEntry: filterEntries(newUserCTL.entries, false),
                        completeEntries: []
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

function filterEntries (entries, isCompleted) {
    let matchingEntries = entries.filter(entry => entry.completed == isCompleted); //Filters all complete or incomplete entries depending on isCompleted
    return (matchingEntries[0] ? (isCompleted ? matchingEntries : matchingEntries[0]) : null); //Returns matches, or empty object if none
}

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