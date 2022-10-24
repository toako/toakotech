import mongoose, { connect } from "mongoose";
import { hash } from "bcrypt";
import User from "../../models/User.js";

const connectMongo = async () => mongoose.connect(process.env.MONGO_URI); //Mongoose fn() to connect to MongoDB

async function handler (req, res) {
    //POST create user
    if (req.method == "POST") {
        try {
            console.log('DB: Attempting connection with MongoDB...');
            await connectMongo();
            console.log('DB: Connected to MongoDB');

            const userEmail = await User.findOne({email: req.body.email});
            const userUsername = await User.findOne({email: req.body.email});
            if (userEmail || userUsername) {
                return res.status(422).json({Auth: `FAIL: User with email <${req.body.email}> or username <${req.body.username}> already exists.`});
            }
            else {
                let newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: await hash(req.body.password, 12)
                });
                newUser.save((err, data) => {
                    if (err) return console.error(err);
                    return res.status(201).json({Auth: `PASS: User <${req.body.username},${req.body.email}> has been created successfully!`});
                });
            }
        } catch (err) {
            console.error(err);
            return res.json({err});
        }
    }
    else {
        return res.status(500).json({"Error": "Request type invalid."})
    }
}

export default handler;