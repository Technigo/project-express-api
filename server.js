import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  // console.log("req", req)
  // console.log("res", res)
  // res.send({responeseMessage: "Hello Technigo!"});

  res.json({responeseMessage: "Here is my first API about books!"});
});

// Books
app.get("/books", (req, res) => {
  res.status(200).json({booksData})
});

app.get("/books/reversed", (req, res) => {
  const booksDataReversed = booksData.reverse()
  res.status(200).json({booksDataReversed})
});

app.get("/books/:bookID", (req, res) => {
  const singleBook = booksData.find((book) => {
    return book.bookID === +req.params.bookID;
    // return member.id === Number(req.params.id);
    // return member.id.toString() === req.params.id;
    // return member.id == req.params.id;
  });
  if(singleBook) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        booksData: singleBook
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Not found",
      body: {}
    });
  }
  console.log(singleBook)
});

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
// import technigoMembers from "./data/technigo-members.json";


// app.get("/books/averageRating/:average_rating", (req, res) => {
//   const { average_rating } = req.params
//   const book = booksData.filter(book => book.average_rating <= average_rating)

//   if (book.length === 0) {
//     res.status(404).send('BLa bla')
//   } else {
//     res.json(book)
//   }
// })


// //Doent work
// app.get("/books/title/:title", (req, res) => {
//   const title = req.params.title
//   const filterOnTitle = booksData.filter((item) => item.region.toLowerCase() === title.toLowerCase())
//   res.status(200).json({filterOnTitle})
// })




//   const { authors, title } = req.query;
//   let book = libraryBooks;

//   if (authors) {
//     book = book.filter(singleLibraryBook => singleLibraryBook.authors.toLowerCase() === authors.toLowerCase());
//   }
//   if (title) {
//     book = book.filter(singleLibraryBook => { return singleLibraryBook.title.toLowerCase() === title.toLowerCase() });
//   }

//   res.status(200).json({
//     success: true,
//     message: "OK",
//     body: {
//       booksData: book
//     }
//   });
// });




//  //Technigo members
// app.get("/members", (req, res) => {
//   const { name, role } = req.query;
//   let members = technigoMembers;

//   if (role) {
//     // members = technigoMembers.filter(singleTechnigoMember => { return singleTechnigoMember.role === role });
//     members = members.filter(singleTechnigoMember => singleTechnigoMember.role.toLowerCase() === role.toLowerCase());
//   }
//   if (name) {
//     members = members.filter(singleTechnigoMember => { return singleTechnigoMember.name.toLowerCase() === name.toLowerCase() });
//   }

//   res.status(200).json({
//     success: true,
//     message: "OK",
//     body: {
//       technigoMembers: members
//     }
//   });
// });

// app.get("/members/:id", (req, res) => {
//   const singleMember = technigoMembers.find((member) => {
//     return member.id === +req.params.id;
//     // return member.id === Number(req.params.id);
//     // return member.id.toString() === req.params.id;
//     // return member.id == req.params.id;
//   });
// if(singleMember) {
//   res.status(200).json({
//     success: true,
//     message: "OK",
//     body: {
//       member: singleMember
//     }
//   });
// } else {
//   res.status(404).json({
//     success: false,
//     message: "Not found",
//     body: {}
//   });
//  }
//  console.log(singleMember) 
// })




// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
