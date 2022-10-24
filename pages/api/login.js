import mongoose, { connect } from "mongoose";
import { compare } from 'bcrypt';
import User from "../../models/User.js";

const connectMongo = async () => mongoose.connect(process.env.MONGO_URI); //Mongoose fn() to connect to MongoDB

async function handler (req, res) {
    //POST login to user
    if (req.method == "POST") {
        try {
            console.log('DB: Attempting connection with MongoDB...');
            await connectMongo();
            console.log('DB: Connected to MongoDB');

            const user = await User.findOne({email: req.body.email});
            if (user) {
                const checkPassword = await compare(req.body.password, user.password);
                console.log(checkPassword ? "Password correct": "Password incorrect");
                if (checkPassword)
                    return res.status(200).json({ id: user._id, email: user.email, username: user.username });
                else 
                    return res.status(401).json({Auth: "FAIL: Login failed. Incorrect credentials."})
            }
            else {
                return res.status(401).json({Auth: "FAIL: User is not found."});
            }
        } catch (err) {
            console.error(err);
            return res.json({err});
        }
    }
    else {
        return res.status(500).json({RequestType: "Invalid request type."})
    }
}

export default handler;