import EmployeeModel from "../models/employee.model";
import { Request, Response } from 'express'

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await EmployeeModel.aggregate([
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectIds',
                    foreignField: 'id',
                    as: 'projects'
                }
            },
        ]);
        return res.status(200).json(employees);
    } catch (err) {
        return res.status(400).json(err);
    }
};


async function getOne(employeeId) {
    return await EmployeeModel.aggregate([
        {
            $match: { id: employeeId },
        },
        {
            $lookup: {
                from: 'projects',
                localField: 'projectIds',
                foreignField: 'id',
                as: 'projects'
            },
        },
        {
            $project: {
                projectIds: 0,
                _id: 0
            }
        }
    ]).then((employee) => employee ? employee[0] : null)
}

export const getEmployeeById = async (req: Request, res: Response) => {
    const employeeId = req.params.id;
    try {
        const employees = await EmployeeModel.findOne({ id: employeeId });
        return res.status(200).json(employees);
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    const employeeId = req.params.id;
    const employeeData = req.body;
    try {
        const employees = await EmployeeModel.findOneAndUpdate(
            { id: employeeId },
            { $set: { ...employeeData } }
        );
        return await res.status(200).json(await getOne(employeeId));
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const createEmployee = async (req: Request, res: Response) => {
    const emp = new EmployeeModel();
    emp.firstname = req.body.firstname;
    emp.lastname = req.body.lastname;
    emp.fullname = req.body.fullname;
    emp.email = req.body.email;
    emp.projectIds = req.body.projectIds;

    try {
        await emp.save();
        res.status(200).json(await getOne(emp.id));
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    const employeeId = req.params.id;
    try {
        await EmployeeModel.deleteOne({ id: employeeId });
        return res.status(200).json(true);
    } catch (err) {
        return res.status(400).json(err);
    }
};



