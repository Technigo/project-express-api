import booksData from "../data/books.json";
import Book from "./book";

const seedDatabase = async () => {
  await Book.deleteMany({});

  booksData.forEach((bookData) => {
    new Book(bookData).save();
  });
};

export default seedDatabase;
