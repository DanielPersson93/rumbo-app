import express from 'express';
// import { getTransactionById, deleteTransactionById, getTransactions, addTransaction } from "../db/transaction";
import { validationResult } from "express-validator";
import { addTransaction, deleteTransactionById, getTransactionById, getTransactions } from '../controllers/transaction.ctrl';


const router = express.Router();

router.delete("/:transactionId", async (req, res) => {
  if (!req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {
    const transactionId = (req.params.transactionId);
    console.log("IS HERE");

    if (!transactionId) {
      return res.sendStatus(400);
    } else {
      const transaction = await getTransactionById(transactionId);
      if (!transaction) {
        res.sendStatus(404);
      } else {
        await deleteTransactionById(transactionId);
        res.json(transaction);
      }
    }

    res.json();
  }
});

router.get("/", async (req, res) => {
  let filter: any = {
    email: req["user"],
  };

  if (req.query.user) {
    console.log(req["user"]);
  }
  if (req.query.year) {
    filter.year = req.query.year;
  }
  if (req.query.month) {
    filter.month = req.query.month;
  }
  await getTransactions(filter).then((transactions) => res.json(transactions));
});

router.post("/", async (req, res) => {
  if (!req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {
    // console.log("logged body", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newTransaction = await addTransaction(req, res);
    res.json(newTransaction);
  }
});
// router.post("/", async (req, res) => {
//   if (req["isAdmin"]) {
//     res.sendStatus(401).end();
//   } else {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const newTransaction = await addTransaction({
//       email: req.body.email,
//       time: req.body.time,
//       amount: req.body.amount,
//       description: req.body.description,
//     });

//     res.json(newTransaction[0]);
//   }
// });
export default router;