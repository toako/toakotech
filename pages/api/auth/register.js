import mongoose from "mongoose";
import { hash } from "bcrypt";

async function handler (req, res) {
    if (req.method == "POST") {
        console.log(req.body);
        res.json({ body: JSON.stringify(req.body), "Success": "User has successfully logged in."});
    }
    else {
        res.status(500).json({"Error": "Request type invalid."})
    }
}

export default handler;