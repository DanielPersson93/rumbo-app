import mongoose from 'mongoose'
import '../models/employee.model';
import '../models/project.model';
import '../models/timeReport.model';
import '../models/transaction.model';

export function connectToDatabase() {

  const uri = 'mongodb://localhost:27017/rumbo';
  const dbURI = process.env["DB_URL"] || uri;

  mongoose
    .connect(dbURI, {
      serverSelectionTimeoutMS: 5000,
    })
    .catch((err: any) => console.log(err.reason));

  mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected`);
  });
  mongoose.connection.on("error", (err: any) => {
    console.log(`Mongoose connection error: ${err}`);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });
}
