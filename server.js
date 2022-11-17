import express, { response } from 'express';
import cors from 'cors';
import technigoMembers from './data/technigo.members.json';

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
app.get('/', (req, res) => {
  res.json({ responseMessage: 'Hello Technigo' });
});
app.get('/members', (req, res) => {
  const { name, role } = req.query;
  let members = technigoMembers;

  if (role) {
    members = technigoMembers.filter(
      (singleTechnigoMember) =>
        singleTechnigoMember.role.toLowerCase() === role.toLocaleLowerCase()
    );
  }
  if (name) {
    members = members.filter((singleTechnigoMember) => {
      return singleTechnigoMember.name.toLowerCase() === name.toLowerCase();
    });
  }

  res.status(200).json({
    success: true,
    message: 'OK',
    body: {
      technigoMembers: members
    }
  });
});

app.get('/members/:id', (request, response) => {
  const singleMember = technigoMembers.find((member) => {
    return member.id === Number(request.params.id);
  });
  if (singleMember) {
    response.status(200).json({
      success: true,
      message: 'OK',
      body: {
        singleMember
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: 'Not Found',
      body: {}
    });
  }
  console.log(singleMember);
});

app.get('/allMovies', (req, res) => {
  const { title, country, duration, type } = req.query;
  let filteredNetflixData = netflixData;
  if (title) {
    filteredNetflixData = filteredNetflixData.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase)
    );
  }
  if (country) {
    filteredNetflixData = filteredNetflixData.filter(
      (item) => item.country.toLocaleLowerCase
    );
  }
  if (duration) {
    //
  }
  if (type) {
    //
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
