/*
@swagger
   components:
     schemas:
       Book:
         type: object
         required:
           - bookID
           - title
           - authors
           - average_rating
           - language_code
           - kids_friendly
         properties:
          bookID:
             type: integer
             description: Unique id of the book.
           title:
             type: string
             description: The title of your book.
           authors:
             type: string
             description: Who wrote the book?
           average_rating: 
             type: integer
             description: How popular is the book on a scale from 1 to 5?
           language_code:
             type: string
             description: eng en-GB or en-US.
           kids_friendly:
             type: boolean
             description: Marker for books suitable for kids reading.
         example:
            bookID: 1
            title: Harry Potter and the Half-Blood Prince
            authors: J.K. Rowling-Mary GrandPré
            average_rating: 4.56
            language_code: eng
            kids_friendly: true
*/

const express = require("express");
const router = express.Router();
const booksData = require("../data/books.json");

/**
 * @openapi
 * /books:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns JSON with all books.
 */

/**
 * @openapi
 * /books:
 *   get:
 *     description: Retrieve all books data or/and search specific books by author, title or language codes.
 *     parameters:
 *       - in: query
 *         name: author
 *         required: false
 *         description: get element by author name or part of the name.
 *         schema:
 *           type: string
 *       - in: query
 *         name: title
 *         required: false
 *         description: get element by title or part of the title.
 *         schema:
 *           type: string
 *       - in: query
 *         name: lang
 *         required: false
 *         description: get element with specific language code (eng, en-GB or en-US).
 *         schema:
 *           type: array
 *     responses:
 *       200:
 *         description: Returns JSON with all books or books that are matching specified request/requests criteria.
 */

//all books data
// with search by queries
// http://localhost:8080/books?author={smth}&title={smth}&lang[]={lang}&lang[]={lang}
router.get("/books", (req, res) => {
  const author = req.query.author?.toLowerCase();
  const title = req.query.title?.toLowerCase();
  const lang = req.query.lang;

  if (lang) {
    if (!Array.isArray(lang) || lang.length === 0) {
      res.status(400).send("lang must be non-empty array");
    }
  }
  let filteredBooks = booksData;

  if (author) {
    filteredBooks = filteredBooks.filter((item) => {
      return item.authors.toLowerCase().includes(author);
    });
  }
  if (title) {
    filteredBooks = filteredBooks.filter((item) => {
      return item.title.toLowerCase().includes(title);
    });
  }
  if (lang) {
    filteredBooks = filteredBooks.filter((item) => {
      return lang.includes(item.language_code);
    });
  }

  if (filteredBooks.length === 0) {
    res.status(404).send("data not found");
  }
  res.json(filteredBooks);
});

/**
 * @openapi
 * /popular:
 *   get:
 *     description: Retrieve most popular books or/and search for kids-friendly books.
 *     parameters:
 *       - in: query
 *         name: kids_friendly
 *         required: false
 *         description: get kids-friendly books among most popular items.
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Returns JSON with most popular books or/and narrow down your search to get most popular kid-friendly books.
 */

// returns most popular books
// http://localhost:8080/popular?kids_friendly=true
router.get("/popular", (req, res) => {
  const showKidsFriendly = req.query.kids_friendly;
  let popularBooks = booksData.filter((item) => {
    return Math.abs(item.average_rating >= 4.4);
  });

  if (showKidsFriendly) {
    popularBooks = popularBooks.filter((item) => item.kids_friendly);
  }

  if (popularBooks.length === 0) {
    res.status(404).send("data not found");
  }
  res.json(popularBooks);
});
/**
 * @openapi
 * /books/{id}:
 *   get:
 *     description: Retrieve one book by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns JSON with one book item.
 */
router.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log({ id });
  const bookById = booksData.filter((item) => {
    const bookWithMatchedId = item.bookID === id;
    return bookWithMatchedId;
  });

  if (!bookById || bookById.length === 0) {
    res.status(404).send("data not found");
  }
  res.json(bookById);
});

/**
 * @openapi
 * /ratings/{rating}:
 *   get:
 *     description: Retrieve books with a specified rating.
 *     parameters:
 *       - in: path
 *         name: rating
 *         required: true
 *         description: Numeric value of rating, accepts floating numbers.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Returns JSON with books that have a direct match to a specified rating and other close matching results.
 */

router.get("/ratings/:rating", (req, res) => {
  const rating = Math.floor(parseFloat(req.params.rating));
  const selectedBooks = booksData.filter((item) => {
    const filteredBooksMatched = item.average_rating >= rating && item.average_rating < rating + 1;
    return filteredBooksMatched;
  });
  if (selectedBooks.length === 0) {
    res.status(404).send("data not found");
  }
  res.json(selectedBooks);
});

/**
 * @swagger
 * /rate:
 *   post:
 *     summary: change rating
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rate:
 *                 type: number
 *                 description: new rate for a book.
 *                 example: 4.1
 *               bookId:
 *                 type: number
 *                 description: book id
 *                 example: 30
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     rate:
 *                       type: number
 *                       description: new rate for a book.
 *                       example: 4.1
 *
 *
 */
router.post("/rate", (req, res) => {
  const rate = req.body.rate;
  const bookId = req.body.bookId;
  const requestedBook = booksData.find((item) => item.bookID === bookId);
  if (rate < 5 && rate >= 0 && bookId) {
    requestedBook.average_rating = rate;
  } else {
    res.status(400).send("wrong params");
  }
  res.json(requestedBook);
});

module.exports = router;
