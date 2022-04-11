import Transaction from "../models/transaction.model";

export const getDescriptionsByEmail = (email: string) => {
    const getDescription = Transaction.aggregate([
        {
            $match: {
                email: email,
            }
        }])

    return getDescription;
};
