import { Schema, model, models } from 'mongoose';

const CodingTimeLog = models.CodingTimeLog || model('CodingTimeLog', new Schema({
    userId: {
        type: String,
        required: true
    },
    entries: {
        type: Schema.Types.Mixed,
        required: true
    }
}));

export default CodingTimeLog;