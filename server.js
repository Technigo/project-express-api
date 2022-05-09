import express from "express";
import cors from "cors";
import listEndpoints from 'express-list-endpoints'

import books from "./routes/books";



const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/books', books)

app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
