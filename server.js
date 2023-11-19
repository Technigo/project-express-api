import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

const listEndPoints = require("express-list-endpoints");

const logger = (req, res, next) => {
    console.log("Hello hello");
    next();
};

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(logger);

// Start defining your routes here
app.get("/", (req, res) => {
    res.send(listEndPoints(app));
});

app.get("/books", (req, res) => {
    //creating a copy of booksData to ensure that filtering operations don't modify the original array.
    let filteredBooks = [...booksData];

    //Filter by language if query parameter is provided.
    const languageParam = req.query.language;
    if (languageParam) {
        filteredBooks = filteredBooks.filter(
            (book) => book.language_code === languageParam
        );
    }

    //Filter by rating if query parameter is provided.
    const averageRatingParam = req.query.averageRating;
    if (averageRatingParam) {
        //parseFloat to convert from string to decimal number.
        const averageRating = parseFloat(averageRatingParam);

        //Round to nearest half value.
        const roundedRating = Math.round(averageRating * 2) / 2;

        //filtering to find the matches with avarageRating, also formatting the data from booksData to be able to find a match.
        filteredBooks = filteredBooks.filter(
            (book) => Math.round(book.average_rating * 2) / 2 === roundedRating
        );
    }

    //if the params in the url have a match (the array is more than 0), returning filteredBooks! (copy of booksData)
    if (filteredBooks.length > 0) {
        res.json(filteredBooks);
    } else {
        //if no match is found, returning an error message.
        res.status(404).send("No books found based on the provided filters");
    }

    //Ex of query: /books?language=eng&averageRating=4.5
});

app.get("/books/book/:bookID", (req, res) => {
    //defining variable to hold the bookID from the request parameters
    const bookID = req.params.bookID;
    //using find() to search for specific book, converting the bookID to an integer.
    const book = booksData.find((book) => book.bookID === parseInt(bookID));
    //checking if the book was found
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

app.get("/books/most-popular", (req, res) => {
    const mostPopularBooks = [...booksData].sort(
        (a, b) => b.ratings_count - a.ratings_count
    );

    const top20Popular = mostPopularBooks.slice(0, 20);

    if (top20Popular.length > 0) {
        res.json(top20Popular);
    } else {
        res.status(404).send("No popular books found");
    }
});

app.get("/books/highest-rated", (req, res) => {
    const highestRatedBooks = [...booksData].sort(
        (a, b) => b.average_rating - a.average_rating
    );

    const top20Rated = highestRatedBooks.slice(0, 20);

    if (top20Rated.length > 0) {
        res.json(top20Rated);
    } else {
        res.status(404).send("No highest-rated books found");
    }
});

// creating category short stories, using Math random to select 20 items from the array of books.
app.get("/books/short-stories", (req, res) => {
    const shortStories = booksData.filter((book) => book.num_pages < 100);

    // Shuffle the array randomly using Fisher-Yates algorithm
    /* Fisher-Yates: randomizing the sort of the books array futher.
        Compares pairs of books. Instead of comparing them in a regular order, 
        we subtract a random value between -0.5 and 0.5 from each comparison.
        If the result is negative, one book goes before the other.
        If the result is positive, the other book goes first.
        If the result is zero, their order doesn't change.*/
    const shuffledShortStories = shortStories.sort(() => Math.random() - 0.5);

    // Return the first 20 items
    const randomShortStories = shuffledShortStories.slice(0, 20);

    if (randomShortStories.length > 0) {
        res.json(randomShortStories);
    } else {
        res.status(404).send("No novels found");
    }
});

app.get("/books/novels", (req, res) => {
    const novels = booksData.filter((book) => book.num_pages > 100);

    // Shuffle the array randomly using Fisher-Yates algorithm
    const shuffledNovels = novels.sort(() => Math.random() - 0.5);

    // Return the first 20 items
    const randomNovels = shuffledNovels.slice(0, 20);

    if (randomNovels.length > 0) {
        res.json(randomNovels);
    } else {
        res.status(404).send("No novels found");
    }
});

app.get("/books/authors/:authors", (req, res) => {
    //defining and formatting the slur (authors name)
    const targetAuthor = req.params.authors.toLowerCase().replace(/\s/g, "");

    let booksByAuthors = booksData.filter((item) => {
        //formatting author names to be able to put them in url
        const formattedItemAuthors = item.authors
            .toLocaleLowerCase()
            .replace(/\s/g, "");

        //returning all books where targetAuthor is included as author
        return formattedItemAuthors.includes(targetAuthor);
    });

    //checking that user found an array with the targetAuthor they defined
    if (booksByAuthors.length > 0) {
        res.json(booksByAuthors);
    } else {
        //if no match is found, returning an error message.
        res.status(404).send("No book found by that author");
    }
});

//DUMMY/EMPTY ENDPOINTS
// Add a new book to booksData
app.post("/books/add", (req, res) => {
    const newBook = req.body; // Assuming the new book details are sent in the request body

    //Would need to add more, but something to check all params are filled..
    if (!newBook.title || !newBook.authors || !newBook.language_code) {
        return res.status(400).send("All parameters must be filled!");
    }

    //the newBook should get a bookID
    //Math.max returns the largest number, using that +1 to create new ID
    const uniqueID = Math.max(...booksData.map((book) => book.bookID)) + 1;
    newBook.bookID = uniqueID;

    //adding the data to array
    booksData.push(newBook);

    res.status(501).send("Not Implemented");
});

// Delete a book from booksData. DELETE as method
app.delete("/books/delete/:bookID", (req, res) => {
    const bookID = req.params.bookID;

    //find the book user wants to delete using index.
    //findIndex finds the first element that matches the  function. findIndex returns -1 if no match is found.
    //this enables testing if a match was found "if (bookIndex !== -1)", for ex.
    const bookIndex = booksData.findIndex((book) => book.bookID === bookID);

    //remove the book
    //splice to delete book, "[0]" is used to get the actual deleted object.
    //Then the book details can be returned to the user to validate that they deleted the object.
    const deletedBook = booksData.splice(bookIndex, 1)[0];

    res.status(501).send("Not Implemented");
});

//NOTE: I did this before I decided I wanted to have it as a query param instead.
//this logic is now in /books.
// app.get("/books/language/:language_code", (req, res) => {
//     const language = req.params.language_code;
//     const booksInLanguage = booksData.filter(
//         (books) => books.language_code === language
//     );
//     if (booksInLanguage.length > 0) {
//         res.json(booksInLanguage);
//     } else {
//         res.status(404).send("No books found in that language");
//     }
// });

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
