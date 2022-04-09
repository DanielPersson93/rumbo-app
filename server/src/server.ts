import express from "express";
import auth from "./auth";
import dotenv from "dotenv";
// import { refreshToken } from "./eaccounting";
// // import { getProjects } from "./db/project";
import { getDescriptionsByEmail } from "./db/description";

import userRouter from './routes/user';
import transactionRouter from './routes/transaction';
import vismaRouter from './routes/visma';
import timeReportRouter from './routes/timeReport';
// import settingsRouter from './routes/settings'
import employeeRouter from './routes/employee';
import projectRouter from './routes/project';
import { connectToDatabase } from "./db/db";
import { refreshToken } from "./eaccounting";
// import { getDescriptionsByEmail } from "./db/description";
const env = process.env.ENV || 'local';
dotenv.config({ path: `config/${env}.env` });
if (env === 'local') {
  dotenv.config({ path: `../config/global.${env}.env` });
} else {
  dotenv.config({ path: `config/global.${env}.env` });
}

const app = express();
const port = 4000;
connectToDatabase();

// app.use(auth);
app.use(express.json());
// //Routers
app.use('/user', userRouter);
app.use('/transaction', transactionRouter);
// app.use('/user', userRouter);
app.use('/visma', vismaRouter);
app.use('/', timeReportRouter);

// app.use('/setting', settingsRouter)
app.use('/employee', employeeRouter);
app.use('/', projectRouter);

app.get('/user/:email/description', async (req, res) => {
  if (req["isAdmin"]) {
    res.send(401).end();
  } else {
    const response: any = await getDescriptionsByEmail(req.params.email);

    res.json(response.map((transaction: any) => transaction.description));
    // console.log(response, 'logged resoponse');
  }
});


if (process.env.VISMA_IMPORT_FEATURE === 'true') {
  refreshToken();
}

// app.get('/project-list', async (req, res) => {
//   if (!req["isAdmin"]) {
//     res.send(401).end();
//   }
//   else {
//     const projects = await getProjects();
//     res.json(projects);
//   }
// });

// app.get('/:email/project-list', async (req, res) => {

//   const email = req.params.email;

//   const projects = await getProjects(email);
//   res.json(projects);
// })

app.get('/user/:email/description', async (req, res) => {
  if (!req["isAdmin"]) {
    res.send(401).end();
  } else {
    const response: any = await getDescriptionsByEmail(req.params.email);
    res.json(response.map((transaction: any) => transaction.description));
  }
});


app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});