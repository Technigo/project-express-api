import express, { request } from "express";
import cors from "cors";
import technigoMembers from "./data/technigo-members.json"

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

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json({responseMessage: "Welcome to my API! Navigate to /books to view the entire array, or enter any of the following queries to find a specific book: bookID, title, authors, average_rating, isbn, isbn13, language_code, num_pages, ratings_count, text_reviews_count"});
});

// This get request below includes query parameters, allowing you to filter by the role or name in the array.
app.get("/members", (req, res) => {
  const { name, role } = req.query;
  let members = technigoMembers;
  if (role) {
    members = members.filter(singleTechnigoMember => singleTechnigoMember.role.toLowerCase() === role.toLowerCase());
  }
  if (name) {
    members = members.filter(singleTechnigoMember => singleTechnigoMember.name.toLowerCase() === role.toLowerCase());
  }


  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      technigoMembers: members
    }
    
  });
});

app.get("/members/:id", (req, res) => {
  const singleMember = technigoMembers.find((member) => {
    return member.id === Number(+request.params.id);
  });
  res.status(200).json({singleMember});

});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
