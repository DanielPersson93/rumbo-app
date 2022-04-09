import Project from '../models/project.model'
import Employee from '../models/employee.model'
import { Request, Response } from 'express'

export const getProject = async (req: Request, res: Response) => {
    if (req['isAdmin']) {
        return res.send(401).end();
    }
    try {
        const project = await Project.aggregate([
            {
                $lookup: {
                    from: 'employees',
                    localField: 'id',
                    foreignField: 'projectIds',
                    as: 'employees'
                }
            }
        ]);
        return res.status(200).json(project);
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const getProjectsByEmployeeEmail = async (req: Request, res: Response) => {
    if (!req['isAdmin']) {
        return res.sendStatus(401).end();
    }
    const email = req.params.email;

    try {
        const employee = await Employee.aggregate([
            /** Find employee with given email */
            { $match: { email } },
            /** Get all of the projects for a given user */
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectIds',
                    foreignField: 'id',
                    as: 'projects'
                }
            }
        ]);
        const projects = employee ? employee[0].projects : [];
        return res.sendStatus(200).json(projects);
    } catch (err) {
        return res.sendStatus(400).json(err);
    }
};


export const getProjectById = async (req: Request, res: Response) => {
    const projectId = req.params.id;
    try {
        const project = await Project.findOne({ _id: projectId });
        return res.sendStatus(200).json(project);
    } catch (err) {
        return res.sendStatus(400).json(err);
    }
};

export const updateProject = async (req: Request, res: Response) => {
    const projectId = req.params.id;
    const projectData = req.body;
    try {
        const project = await Project.findOneAndUpdate(
            { _id: projectId },
            { $set: { ...projectData } }
        );
        return res.status(200).json(true);
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const createProject = async (req: Request, res: Response) => {
    const proj = new Project();
    proj.customer_name = req.body.customer_name;
    proj.project_name = req.body.project_name;
    proj.agreement_ref = req.body.agreement_ref;
    proj.active = req.body.active;
    proj.active = req.body.active;

    try {
        await proj.save();
        return res.status(200).json(proj);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    const projectId = req.params.id;
    try {
        await Project.deleteOne({ id: projectId });
        return res.status(200).json(true);
    } catch (err) {
        return res.status(400).json(err);
    }
};
