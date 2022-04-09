import mongoose, { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface Project {
    id: string;
    customer_name: string;
    project_name: string;
    agreement_ref: string;
    active: boolean;
    created_at: Date;
}

const schema = new Schema<Project>({
    id: {
        type: String,
        default: () => {
            return uuidv4()
        }
    },
    customer_name: { type: String, required: true },
    project_name: { type: String, required: true },
    agreement_ref: { type: String, required: true },
    active: { type: Boolean, required: true },
    created_at: {
        type: Date, default: () => {
            return new Date()
        }
    },
})

export default model<Project>('Project', schema);

