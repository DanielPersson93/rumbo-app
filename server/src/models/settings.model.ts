import { param } from 'express-validator';
import mongoose, { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ISetting } from '../interfaces/settings';

const schema = new Schema<ISetting>({
    id: {
        type: String,
        default: () => {
            return uuidv4()
        }
    },
    key: { type: String, required: true },
    value: { type: String, required: true }
})

export default model<ISetting>('Setting', schema);