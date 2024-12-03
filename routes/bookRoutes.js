import express from "express";
import { getBooks, addBook } from "../controllers/bookController.js";
import { validateBook } from "../middleware/validateBook.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", validateBook, addBook);

export default router;
