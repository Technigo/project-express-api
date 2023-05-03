import express from "express";
import cors from "cors";
import technigoMembers from "./data/technigo-members.json";
import booksData from "./data/books.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
// const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
/*
// Start defining your routes here
app.get("/", (req, res) => {
  // res.send("Hello Technigo!");
  res.json(listEndpoints(app));

});*/
 
app.get("/", (request, response) => {
  response.send("Hello Annika!")
})


///////////// ROUTE Get all books in the database ///////////////////////
app.get("/books", (request, response) => {
  const books = booksData; 
  if (books) {
    response.status(200).json({
      success: true, 
      message: "OK",
      body: {
        booksData: books
      } 
    })
  } else {
    response.status(500).json({
      success: false, 
      message: "Something went wrong",
      body: {}
    })
  }
})

///////// ROUTE Get a specific book,  using the ID of the book //////////
app.get("/books/:id", (request, response) => {
const { id } = request.params;
console.log("id: ", id);
const singleBook = booksData.find((book) => {
  return book.bookID.toString() === id; 
})
if (singleBook) {
  response.status(200).json({
    success: true, 
    message: "OK",
    body: { 
      book: singleBook
    }
  })
} else {
  response.status(404).json({
    success: false,
    message: "Book not found!",
    body: {}
  })
}

})

////////////// ROUTE Get filter the books based on the languages ////////////
app.get("/books/languages/:language_code", (request, response) => {
  const languages = booksData.filter((book) => {
    return book.language_code.toLowerCase() === request.params.language_code.toLowerCase()
  }) 
  if (languages.length !== 0){
    response.status(200).json({
      success: true, 
      message: "OK",
      body: { 
        language: languages
      }
    })
  } else {
    response.status(404).json({
      success: false, 
      message: "Language not found!",
      body: {}
    })
  }
})

//// ROUTE Get the top 10 rated books based on their average rating ////////
app.get("/top_10", (request, response) => {
  const sortedBooks = booksData.sort((a, b) => b.average_rating - a.average_rating).slice(0, 10);

  if(sortedBooks.length > 0) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        top_rated: sortedBooks
      }
    })
  } else {
    response.status(500).json({
      success: false, 
      message: "Something went wrong",
      body: {}
    })
  }
})


////////////// ROUTE Get top rated books (sort by average rating) ////////////
/* app.get("/books/top_rated", (request, response) => {
  const topbooks = booksData.sort
}) */


/*
// get all technigo members
app.get("/members", (request, response) => {
  const { role } = request.query;
  let members = technigoMembers;
  if (role) {
    members = technigoMembers.filter((singleMember) => {
      return singleMember.role.toLowerCase() === role.toLowerCase();
    });
  } 

  if (members) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        technigoMembers: members
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
app.get("/members/:id", (request, response) => {
  const { id } = request.params;
  console.log("id: ", id);
  const singleMember = technigoMembers.find((member) => {
    // return member._id == id;
    // return member._id === Number(id);
    // return member._id.toString() === id;
    // return member._id === +id; 
  });
  if (singleMember) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        member: singleMember
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Member not found",
      body: {}
    });
  }
});*/
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
