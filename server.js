import cors from "cors";
import express from "express";
import topMusic from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, 
// but can be overridden when starting the server. 
// Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.get('/songs/', (req, res) => {
  const genre = req.query.genre;
  let allSongs = topMusic;

  if (genre) {
    allSongs = allSongs.filter((song) => song.genre === genre);
 };

 res.json(allSongs);
});

app.get('/songs/:id', (req, res) => {
  const id = req.params.id;
  const songById = topMusic.filter(song => song.id === +id);
  res.json(songById);
});

// LÄGG TILL felmedd om inte genren finns 
// kolla common pitfalls

/*   const { name, role } = req.query; // när det är unika värden som t ex id
  let members = technigoMembers;

  if (role) {
    members = members.filter((singleMember) => {
      return singleMember.role.toLowerCase() === role.toLowerCase();
    })
  }

  if (name) {
    members = members.filter((singleMember) => {
      return singleMember.name.toLowerCase() === name.toLowerCase();
    })
  }

  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      technigoMembers: members
    }
  });
    res.status(404).json({
    success: false,
    message: "Not OK",
    body: {
      "Page not found."
    }
  });
}); */

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
