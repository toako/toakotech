import mongoose from 'mongoose';
const { DateTime } = require("luxon");

const connectMongo = async () => mongoose.connect(process.env.MONGO_URI); //Mongoose fn() to connect to MongoDB

export default async function handler(req, res) {
    if (req.method == "GET") {
        try {
            console.log('Mongoose: Attempting connection with MongoDB...');
            await connectMongo();
            console.log('Mongoose: Connected to MongoDB');
            res.json({info: "GET worked successfully!"});
        } catch (err) {
            console.error(err);
            res.json({err});
        }
    }
    else if (req.method == "POST") {
        //CONNECTING TO MONGODB
        try {
            console.log('Mongoose: Attempting connection with MongoDB...');
            await connectMongo();
            console.log('Mongoose: Connected to MongoDB');
            res.json({info: "POST worked successfully!"});
        } catch (err) {
            console.error(err);
            res.json({err});
        }
    }
}

