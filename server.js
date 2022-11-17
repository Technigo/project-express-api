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

app.get('/songs', (req, res) => {
  const { name, role } = req.query; // när det är unika värden som t ex id
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
});

/* app.get("/bpm/:bpm", (req, res) => {
  const filteredByBpm = topMusicData.filter((song) => {
    return song.bpm === +req.params.bpm
  });
  if (!filteredByBpm) {
    return res.status(404).json('Sorry, no songs ')
  } else
  res.status(200).json(filteredByBpm);
}); */

/* app.get("/members/:id", (req, res) => {
  const singleMember = technigoMembers.find((member) => {
    return member.id === +req.params.id
    });
  res.status(200).json(singleMember);
}); */

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
