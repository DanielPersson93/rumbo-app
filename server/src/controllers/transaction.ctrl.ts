import Transaction, { TransactionStatus } from '../models/transaction.model'
import { Request, Response } from 'express'

type getTransactionFilter = {
    email?: string;
    year?: string;
    month?: string;
    description?: string;
};

export const getTransactions = async ({
    email,
    year,
    month,
    description,
}: getTransactionFilter) => {
    const match: any = {
        status: 0,
    };
    if (email) {
        match.email = email;
    }
    if (year) {
        match.year = year;
    }
    if (month) {
        match.month = Number(month) > 10 ? month : `0${month}`;
    }
    if (description) {
        // https://stackoverflow.com/questions/26814456/how-to-get-all-the-values-that-contains-part-of-a-string-using-mongoose-find
        match.description = { "description": { "$regex": description, "$options": "i" } }
    }

    return await Transaction.aggregate([
        {
            $project: {
                id: 1,
                email: 1,
                amount: 1,
                year: { $substr: ['$time', 0, 4] },
                month: { $substr: ['$time', 5, 2] },
                time: 1,
                description: 1,
                sum: 1,
                sourceReference: 1,
                status: 1
            }
        },
        {
            $match: match
        },
    ])
};



export const getTransactionById = async (transactionId: string) => {
    console.log(`Getting transaction with id: ${transactionId}`);
    const transaction = Transaction.findOne({ id: transactionId });
    return await transaction;
};

export const deleteTransactionById = async (transactionId: string) => {
    console.log(`Deleting transaction with id: ${transactionId}`);
    const deleteTranaction = Transaction.deleteOne({ id: transactionId })
    return await deleteTranaction;
};

// export const addTransaction = async (transaktion) => {
//     const transaction = new Transaction(transaktion)
//     await transaction.save()
//     return transaction
// }
export const addTransaction = async (req: Request, res: Response) => {
    const transaction = new Transaction();
    transaction.email = req.body.email;
    transaction.time = req.body.time;
    transaction.amount = req.body.amount;
    transaction.description = req.body.description;
    transaction.status = TransactionStatus.Final;
    try {
        await transaction.save();
        return transaction;
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
};


export const getTransactionsMeta = async (email: string) => {
    if (!email) {
        return [];
    }
    const res = await Transaction.aggregate([
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
        }]);

    return res.map(meta => ({ year: Number(meta.year), month: Number(meta.month) }));
};