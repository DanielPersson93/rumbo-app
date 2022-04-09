import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface Employee {
    id: string;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
    projectIds: string[];
}

const schema = new Schema<Employee>({
    id: {
        type: String,
        default: () => {
            return uuidv4()
        }
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    projectIds: [{ type: String, default: [] }]
})
const EmployeeModel = model<Employee>('Employee', schema)
export default EmployeeModel