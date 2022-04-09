import Mongoose, { model } from "mongoose";
import { v4 as uuidv4 } from 'uuid'

export interface Transaction {
    id?: string,
    email: string;
    time: Date;
    amount: number;
    description: string;
    sum?: number;
    sourceReference?: string;
    status?: TransactionStatus;
};

export enum TransactionStatus {
    Final = 0,
    Preliminary = 1,
    Rejected = 2
}

const schema = new Mongoose.Schema<Transaction>({
    id: {
        type: String,
        default: () => {
            return uuidv4()
        }
    },
    email: { type: String, required: true },
    time: { type: Date, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    sum: { type: Number },
    sourceReference: { type: String },
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 0,
    },
})

export default model<Transaction>('Transaction', schema);