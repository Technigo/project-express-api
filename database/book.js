import { Decimal128 } from "mongodb";
import mongoose from "mongoose";
import { book } from "./modelNames";

const bookSchema = new mongoose.Schema({
  bookID: Number,
  title: String,
  authros: String,
  average_rating: Decimal128,
  isbn: Number,
  isbn13: Number,
  language_code: String,
  num_pages: Number,
  ratings_count: Number,
  text_reviews_count: Number,
});

const Book = mongoose.model(book, bookSchema);

export default Book;
