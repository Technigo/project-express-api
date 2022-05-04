import express from "express";
import cors from "cors";

import goldenGlobesData from "./data/golden-globes.json";
import lionMembers from "./data/team-lions.json";
import booksData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();


app.use(cors());
app.use(express.json());

//endpoint 1
app.get("/", (req, res) => {
  res.send("Hello there! This page is for educational purpose only");
});

//endpoint 2 finding array of elements from 
app.get("/members", (req, res) => {

  res.status(200).json({
    data: lionMembers,
    success: true,
  });
});

//endpoint 3 finding single lionMember by name
app.get("/members/name/:name", (req, res)=> {
  const { name } = req.params;
  const memberByName = lionMembers.find(
    (member) => member.name === name); 
  
  if (!memberByName) {
    res.status(404).json({
      data: `${name} not found in the database.`,
      success: false, 
    });
  } else {
    res.status(200).json({
      data: memberByName,
      success: true,
    });
  }
});

//endpoint 4 finding array of elements 
app.get("/nominations", (req, res) => {

  res.status(200).json({
    data: goldenGlobesData,
    success: true,
  });
});

//endpoint 5 filtering nominations by year.
app.get("/nominations/year/:year", (req, res)=> {

  const year = req.params.year
  const showWon = req.query.won
  let nominationsByYear = goldenGlobesData.filter((item) => item.year_award === +year);

  if (showWon) {
    nominationsByYear = nominationsByYear.filter((item) => item.win)
  }
  
  res.status(200).json({
    data: nominationsByYear,
    success: true,
  });
})

//endpoint 6 finding array of books
app.get("/books", (req, res) => {

  res.status(200).json({
    data: booksData,
    success: true,
  });
})

//endpoint 7 , searching title with filter(), include() and 'toLocaleLowerCase()' to maximize search results. 
app.get("/books/title/:title", (req, res) =>{

  const { title } = req.params;
  const bookTitle = booksData.filter(
    (item) => item.title.toLocaleLowerCase()
    .includes(title.toLocaleLowerCase()));

  //First if statement gives us the amount of books filtered out from the entire booksData. If there is/are object(s) returned then "status(200)". 
  if (bookTitle.length !== 0) {
    res.status(200).json({
      data: bookTitle,
      success: true,});
    //console.log(bookTitle.length)
  } else {
    res.status(404).json({
      data: "Title not found. Please check spelling.",
      success: false,
    });
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
