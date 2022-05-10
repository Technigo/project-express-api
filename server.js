import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import startDB, { getBookModel } from "./database/database";
import { dbErrorHandler } from "./middleware/dbErrorHandler";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(dbErrorHandler);

//Router setup
app.get("/", (req, res) => {
  const landing = {
    about: "Welcome to My Book Store📚",
    APIs: listEndpoints(app),
  };
  res.send(landing);
});

app.get("/books", async (req, res) => {
  const { limit, title } = req.query;

  const bookModel = getBookModel();
  try {
    let data = await bookModel.find({}).exec();
    let success = true;
    let error = "";

    if (title) {
      //Partial search
      data = await bookModel
        .find({
          $or: [{ title: { $regex: title, $options: "i" } }],
        })
        .exec();

      if (!data.length) {
        success = false;
        error = "No result found";
        return res.status(404).json({ data, success, error });
      }
    }

    if (limit) {
      const numLimit = Number(limit);
      if (numLimit < 0 || !Number.isInteger(numLimit)) {
        success = false;
        error = "Invalid limit value";
      } else {
        data = await bookModel.find().limit(limit);
      }
    }

    return res.status(200).json({ data, success, error });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});

app.get("/books/:bookId", async (req, res) => {
  const bookID = Number(req.params.bookId);

  let data = {};
  let success = true;
  let error = "";

  if (bookID < 0 || !Number.isInteger(bookID)) {
    res.status(404).json({ data, success: false, error: "Invalid bookId" });
  }
  try {
    data = await getBookModel().find({ bookID }).exec();

    if (!data) {
      data = {};
      success = false;
      error = "No result found";
      return res.status(404).json({ data, success, error });
    }
    return res.status(200).json({ data, success, error });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});

startDB().then(
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  })
);
