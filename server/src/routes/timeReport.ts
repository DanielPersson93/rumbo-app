import express, { application } from 'express';
import { validationResult } from "express-validator";
import { addTimeReport, deleteTimeReportById, getTimeReport, getTimeReportById, updateTimeReport } from '../controllers/timeReport.ctrl';
// import { TimeReport } from '../types';

const router = express.Router();
// router.get('/project/:id/timereport', getTimeReportById)
// router.post("/timereport", async (req, res) => {
// router.put("/:email/timereport/:id", async (req, res) => {
// router.delete("/:email/timereport/:timeReportId", async (req, res) => {

router.get('/project/:id/timereport', (req, res) => {
  if (req["isAdmin"]) {
    res.sendStatus(401).end();
  }
  else {
    let filter: any = {
      project: req.params.id
    }
    if (req.query.year) {
      filter.year = req.query.year;
    }
    if (req.query.month) {
      filter.month = req.query.month;
    }
    console.log(filter);

    getTimeReport(filter).then((timereport) => res.json(timereport));

  }
});

router.get('/user/:email/timereport', (req, res) => {
  if (req["isAdmin"]) {
    res.sendStatus(401).end();
  }
  else {
    let filter: any = {
      email: req.params.email
    }
    if (req.query.year) {
      filter.year = req.query.year;
    }
    if (req.query.month) {
      filter.month = req.query.month;
    }
    console.log(filter);

    getTimeReport(filter).then((timereport) => res.json(timereport));

  }
});

router.delete("/:email/timereport/:timeReportId", async (req, res) => {
  if (req.params.email != req["user"] && req["isAdmin"]) {
    res.sendStatus(401).end();
    console.log("Loggar params", req.params);
  } else {

    const timeReportId = String(req.params.timeReportId);

    if (!timeReportId) {
      console.log('Im in here');

      return res.sendStatus(400);
    } else {
      console.log('Logged', timeReportId);
      const timereport = await getTimeReportById(timeReportId);

      if (!timereport._id) {
        res.sendStatus(404);
        console.log('Hejsan');
      } else {

        await deleteTimeReportById(timeReportId);
        res.json(timereport);
      }
    }
    res.json();

  }
});


router.post("/timereport", async (req, res) => {
  if (req.body.email != req["user"] && req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTimeReport = await addTimeReport(req, res);
    let timeReportArr = []
    timeReportArr.push(newTimeReport)


    const mapTimeReportData = { ...timeReportArr[0], hours: Number(timeReportArr[0].hours) };
    delete mapTimeReportData.created_at;
    res.json(mapTimeReportData['_doc']);
  }
});




router.put("/:email/timereport/:id", async (req, res) => {

  if (req.body.email != req["user"] && req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedTimeReport = await updateTimeReport(req, res);

    res.status(200).json();
  }
});

export default router;