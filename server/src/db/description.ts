import Transaction from "../models/transaction.model";
// // import { query } from "./db";




export const getDescriptionsByEmail = (email: string) => {
    const getDescription = Transaction.aggregate([
        {
            $match: {
                email: email,
            }
        }])

    return getDescription;


    // const sqlQuery = `SELECT DISTINCT description FROM public.transactions WHERE email LIKE $1`;
    // return await query(sqlQuery, [email]);
};
