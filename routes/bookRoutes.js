import express from "express";
import {
  getBooks,
  getBookByID,
  addBook,
} from "../controllers/bookController.js";
import { validateBook } from "../middleware/validateBook.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookByID);
router.post("/", validateBook, addBook);

export default router;
