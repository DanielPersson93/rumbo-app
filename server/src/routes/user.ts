// import express from "express";
// import { getTransactions, getTransactionsMeta, filterOutExistingTransactions } from "../db/transaction";
// import { getTimeReport, getTimeReportMeta } from "../controllers/timeReport.ctrl";
// import { getSalaryTransactions } from "../eaccounting";
import express from 'express';
import { getTimeReport, getTimeReportMeta } from '../controllers/timeReport.ctrl';
import { getTransactions, getTransactionsMeta } from '../controllers/transaction.ctrl';

const router = express.Router();

router.get("/:email/transactionsmeta", async (req, res) => {
  if (req.params.email != req["user"] && req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {
    const transactionsMeta: any = await getTransactionsMeta(req.params.email);
    if (!transactionsMeta?.length) {
      res.json([{ year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1 }])
    } else {
      res.json(transactionsMeta);
    }
  }
});

router.get("/:email/timereportmeta", async (req, res) => {
  console.log(req["user"]);

  if (req.params.email != req["user"] && req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {
    const timeReportMeta: any = await getTimeReportMeta(req.params.email);
    if (!timeReportMeta.length) {
      res.json([{ year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1 }])
    } else {
      res.json(timeReportMeta);
    }
  }
})
// const router = express.Router();

// //isAdmin "skapas" i auth.ts -> auth.ts används sedan i server.ts (main-app) -> används sedan här via (?) main-app...
router.get("/:email/transaction", async (req, res) => {
  if (req.params.email != req["user"] && req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {
    let filter: any = {
      email: req.params.email,
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
    if (req.query.description) {
      filter.description = req.query.description;
    }
    const transactions = await getTransactions(filter);
    res.json(transactions);
  }
});

// // TODO skapa en project route?

router.get("/:email/timereport", async (req, res) => {
  if (req.params.email != req["user"] && req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {
    let filter: any = {
      email: req.params.email,
    };
    if (req.query.year) {
      filter.year = req.query.year;
    }
    if (req.query.month) {
      filter.month = req.query.month;
    }
    if (req.query.project_id) {
      filter.project = req.query.project_id;
    }
    const timeReport = await getTimeReport(filter);
    const mappedReports = timeReport.map((timereport) => ({ ...timereport, hours: Number(timereport.hours) }))
    res.json(mappedReports);
  }

});

router.get("/:email/transactionsmeta", async (req, res) => {
  if (req.params.email != req["user"] && req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {
    const transactionsMeta: any = await getTransactionsMeta(req.params.email);
    console.log(transactionsMeta);

    if (!transactionsMeta.length) {
      res.json([{ year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1 }])
    } else {
      res.json(transactionsMeta);
    }
  }
});

router.get("/:email/timereportmeta", async (req, res) => {
  if (req.params.email != req["user"] && req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {
    const timeReportMeta: any = await getTimeReportMeta(req.params.email);
    if (!timeReportMeta.length) {
      res.json([{ year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1 }])
    } else {
      res.json(timeReportMeta);
    }
  }
})
export default router;
