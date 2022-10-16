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

            const user = await User.findOne({email: req.body.email});
            if (user) {
                res.status(422).json({Auth: `FAIL: User with email <${req.body.email}> already exists.`});
            }
            else {
                let newUser = new User({
                    email: req.body.email,
                    password: await hash(req.body.password, 12)
                });
                newUser.save((err, data) => {
                    if (err) return console.error(err);
                    res.status(201).json({Auth: `PASS: User <${req.body.email}> has been created successfully!`});
                });
            }
        } catch (err) {
            console.error(err);
            res.json({err});
        }
    }
    else {
        res.status(500).json({"Error": "Request type invalid."})
    }
}

export default handler;