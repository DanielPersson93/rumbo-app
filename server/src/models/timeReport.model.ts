import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type TimeReport = {
    id?: string;
    email: string;
    time: Date;
    description: string;
    hours: number;
    project_id: string;
    created_at?: Date;
}

const schema = new Schema<TimeReport>({
    id: {
        type: String,
        default: () => {
            return uuidv4()
        }
    },
    email: { type: String, required: true },
    time: { type: Date, required: true },
    hours: { type: Number, required: true },
    description: { type: String, required: true },
    created_at: {
        type: Date,
        default: () => {
            return new Date();
        },
    },
    project_id: { type: String, required: true }
})

export default model<TimeReport>('TimeReport', schema);