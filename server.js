import express from "express";
import cors from "cors";
// import technigoMembers from "./data/technigo-members.json";
import booksData from "./data/books.json";
import netflixData from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app));

});

app.get("/books", (request, response) => {
  const { title } = request.query;
  let books = booksData;
  if (title) {
    books = booksData.filter((singleBook) => {
      return singleBook.title.toLowerCase() === title.toLowerCase();
    });
  } 

  if (books) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        booksData: books
      }
    });
  } else {
    response.status(500).json({
      success: false,
      message: "Something went wrong",
      body: {}
    });
  }
});
// DRY - don't repeat yourself
// get all technigo members
app.get("/books/:id", (request, response) => {
  const { id } = request.params;
  console.log("id: ", id);
  const singleBook = booksData.find((books) => {
    // return member._id == id;
    return books.bookID === Number(id);
    // return member._id.toString() === id;
    // return member._id === +id; 
  });
  if (singleBook) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        books: singleBook
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Book not found",
      body: {}
    });
  }
});

app.get("/netflix", (request, response) => {
  const { title } = request.query;
  let item = netflixData;
  if (title) {
    item = netflixData.filter((singleItem) => {
      return singleItem.title.toLowerCase() === title.toLowerCase();
    });
  } 

  if (item) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        netflixData: item
      }
    });
  } else {
    response.status(500).json({
      success: false,
      message: "Something went wrong",
      body: {}
    });
  }
});

app.get("/netflix/id/:id", (request, response) => {
  const { id } = request.params;
  const singleItem = netflixData.find((item) => {
    return item.show_id === Number(id);
  });
  if (singleItem.length > 0) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        item: singleItem
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Item not found",
      body: {}
    });
  }
  
});

app.get("/netflix/released/:year", (request, response) => {
  const { year } = request.params;
  const singleItem = netflixData.filter((item) => {
    return item.release_year === Number(year);
  });
  if (singleItem) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        item: singleItem
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Year not found",
      body: {}
    });
  } 
});

app.get("/netflix/origin/:country", (request, response) => {
  const { country } = request.params;
  const singleItem = netflixData.filter((item) => {
    return item.country.toLowerCase().replace(/\s/g, "") === country.toLowerCase().replace(/\s/g, "");
    // return singleItem.country.toLowerCase() === country.toLowerCase();
  });
  if (singleItem) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        item: singleItem
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Country not found",
      body: {}
    });
  } 
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

/// endpoint/:pathParam1/:pathParam2?queryParamName=queryParamValue&queryParam5Name=queryParam5Value&queryParam2Name=queryParam2Value