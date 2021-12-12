import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints"; // This is an express package to list all registered endoints and its verbs (npm i express-list-endpoints)
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden when starting the server. For example: PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express(); // To initialised a new express server

// Middlewares: to enable cors and json body parsing
app.use(cors()); // Cors is a technology which allows APIs to say where request can come from for extra security
app.use(express.json()); // express is exactly the same as the bodyParser() method


//  --------- SIMPLE ENDPOINTS --------------//
// Only use the response parameter as it gets a general response
// Therefore, we don't need the request parameter to ask the user for a specific value.

// Endpoint 1:  Front-end get just a sentence (http://localhost:8080)
app.get("/", (req, res) => {
  res.send(
    "My name is Fatima and if you know me well, you must already know that I just love cats!"
  );
});

// Endpoint 2: Front-end get a list of all my endpoints: (http://localhost:8080/endpoints)
app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app));
});

//Endpoint 3: Front-end get an array of objects that holds info about books: (http://localhost:8080/books)
app.get("/books", (req, res) => {
  res.json(booksData);
});

// ---------   ENDPOINTS USING PATH PARAMS -----------//
// Are used to show info about something specific.
// Must used find() method because returns the value of the first element that passes a test and we are expecting one specific value.
// Must use both parameters, the request parameter first (the request deals with what the frontend sends to the backend) and lastly the response parameter.

//Endpoint 4: Front-end gets an object with the book info that matches the specific id requested in the URL
app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const bookid = booksData.find((item) => item.bookID === +id);

  if (!bookid) {
    res.status(404).json({
      response: "No book found with that ID, sorry!",
      success: false,
    });
  } else {
    res.status(200).json({
      response: bookid,
      success: true,
    });
  }
});

//Endpoint 5: Front-end gets an object with the book info that matches the specific title requested in the URL
app.get("/books/title/:title", (req, res) => {
  const title = req.params.title;
  const titleBook = booksData.find((item) => item.title.toLowerCase() === title.toLowerCase() );

  if (!titleBook) {
    res.status(404).json({
      response: "No book found with that title, sorry!",
      success: false,
    });
  } else {
    res.status(200).json({
      response: titleBook,
      success: true,
    });
  }
});


// ----------- ENDPOINTS USING QUERY PARAMS -----------//
// Must used filter() method because it returns a new array filled with all elements that pass the filter we want
// Must use both parameters, the request parameter first (the request deals with what the frontend sends to the backend) and lastly the response parameter.
// If there are no objects to show but the response from the JSON was successful, it returns an empty array.

//Endpoint 6:
app.get('/allbooks', (req, res) => {
  const { author, title } = req.query;
  let booksDataToSend = booksData;

  if (author) {
    booksDataToSend= booksDataToSend.filter((item) => item.authors.toLowerCase().indexOf(author.toLowerCase()) !== -1 );
  }
  if (title) {
    booksDataToSend = booksDataToSend.filter((item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1 );
  }
  // if (isbn) {
  //   newVariable = newVariable.filter((item) => item.isbn.indexOf(isbn) !== -1 );
  // }

  res.json({
    response: newVariable,
    success: true,
  })  

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
