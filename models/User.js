import { Schema, model, models } from 'mongoose';

const User = models.User || model('User', new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}));

export default User;