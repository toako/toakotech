import { Schema, model, models } from 'mongoose';

const UserCTL = models.UserCTL || model('UserCTL', new Schema({
    username: {
        type: String,
        required: true
    },
    entries: {
        type: Schema.Types.Mixed,
        required: true
    }
}));

export default UserCTL;