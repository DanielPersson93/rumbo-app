import { json } from 'express';
import { getOriginalNode, isExpressionStatement, setOriginalNode } from 'typescript';
import TimeReport from '../models/timeReport.model';
import { Request, Response } from 'express'

interface getTimeReportFilter {
    email?: string;
    year?: string;
    month?: string;
    project?: string;
    project_id?: string;
};


export const getTimeReport = async ({
    email,
    year,
    month,
    project,
}: getTimeReportFilter) => {
    let match: any = {};
    let params = [];
    if (email) {
        match.email = email;
    }
    if (year) {
        match.year = year
    }
    if (month) {
        match.month = Number(month) > 10 ? month : `0${month}`;
    }
    if (project) {
        match.project_id = project;
    }

    return await TimeReport.aggregate([
        {
            $project: {
                id: 1,
                email: 1,
                year: { $substr: ['$time', 0, 4] },
                month: { $substr: ['$time', 5, 2] },
                time: 1,
                description: 1,
                hours: 1,
                project_id: 1,
            }
        },
        {
            $match: match
        },
    ])
};
export const getTimeReportById = async (timereportId: string) => {
    const timereport = TimeReport.findOne({ id: timereportId })
    return await timereport;
}

export const deleteTimeReportById = async (timeReportId: String) => {
    const deleteTimeReport = TimeReport.deleteOne({ id: timeReportId })
    return deleteTimeReport
};
export const addTimeReport = async (req: Request, res: Response) => {
    const addNewTimeReport = new TimeReport();
    addNewTimeReport.email = req.body.email;
    addNewTimeReport.time = req.body.time;
    addNewTimeReport.description = req.body.description
    addNewTimeReport.hours = req.body.hours
    addNewTimeReport.project_id = req.body.project_id
    try {
        await addNewTimeReport.save();
        return res.status(200).json(addNewTimeReport);

    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
};

export const updateTimeReport = async (req: Request, res: Response) => {
    const timeId = req.params.id
    const timeData = req.body;
    try {
        const updateTime = await TimeReport.findOneAndUpdate(
            { id: timeId },
            { $set: { ...timeData } }

        );
        return res.status(200).json(updateTime)
    } catch (err) {
        return res.status(400).json(err);
    }


};
export const getTimeReportMeta = async (email: string) => {
    if (!email) {
        return [];
    }
    return await TimeReport.aggregate([
        { $match: { email } },
        {
            $project: {
                _id: 1,
                time: 1,
                email: 1,
                year: { $substr: ['$time', 0, 4] },
                month: { $substr: ['$time', 5, 2] },
            }
        },
        {
            /** Group by year and month to remove duplicates */
            $group: {
                _id: {
                    year: "$year",
                    month: "$month"
                },
            },
        },
        {
            /** Re group objects from _id object to outer fields */
            $project: {
                year: "$_id.year",
                month: "$_id.month",
                _id: 0
            }
        }])
};
