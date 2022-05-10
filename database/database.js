import "dotenv/config";
import mongoose from "mongoose";
import Book from "./book";
import seedDatabase from "./seeds";
import { setDbError } from "../middleware/dbErrorHandler";

const uri = process.env.MONGO_URL;
if (!uri) {
  throw new Error("cannot find MONGO_URL");
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default async function startDB() {
  try {
    await mongoose.connect(uri, options, function (err) {
      if (err) throw new Error(err);
    });

    const conn = mongoose.connection;

    conn.on("connected", async function () {
      console.log("database is connected successfully");

      const dataCount = await Book.count({});
      if (!dataCount) {
        //seeding data only if no documents on model
        seedDatabase();
      }
    });
    conn.on("disconnected", function () {
      console.log("database is disconnected successfully");
    });

    conn.on("error", () => {
      console.error.bind(console, "connection error:");
      setDbError();
    });
  } catch (e) {
    console.error(`error while connect monngoose, error : ${e}`);
  }
}

export function getBookModel() {
  return Book;
}
