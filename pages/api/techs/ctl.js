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
                let unfinishedEntry = userCTL.entries.filter((entry) => !entry.completed)[0]; //Searches list for an incomplete log
                console.log(unfinishedEntry);
                return res.status(422).json({status: "UserFound", unfinishedEntry });
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
            if (userCTL) {
                let unfinishedEntry = userCTL.entries.filter((entry) => !entry.completed);
                if (unfinishedEntry[0]) { //If unfinished entry, finish entry
                    userCTL.entries[userCTL.entries.length - 1].completed = true;
                    userCTL.entries[userCTL.entries.length - 1].endTime = DateTime.now().setZone("UTC").toISO();
                    userCTL.entries[userCTL.entries.length - 1].notes = req.body.notes;

                    userCTL.markModified("entries");
                    userCTL.save((err, savedUserCTL) => {
                        if (err) return console.error(err);
                        return res.json({status: "FinishedEntry", entries: savedUserCTL.entries});
                    });
                }
                else { //If no unfinished entry, start entry
                    userCTL.entries.push(createEntry(userCTL.entries.length, req.body.title));
                    userCTL.markModified("entries");
                    userCTL.save((err, savedUserCTL) => {
                        if (err) return console.error(err);
                        return res.json({status: "StartedEntry", entries: savedUserCTL.entries});
                    });
                }
            }
            else {
                let newEntry = createEntry(0, req.body.title);
                let newUserCTL = new UserCTL({
                    username: req.body.username,
                    entries: [ newEntry ]
                });
                newUserCTL.save((err, newUserCTL) => {
                    if (err) return console.error(err);
                    return res.status(201).json({status: "UserCreateAndStartedEntry", startTime: newUserCTL.entries[0].startTime});
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