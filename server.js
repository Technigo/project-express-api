import express, { request, response } from "express";
import cors from "cors";

import musicData from "./data/top-music.json";

const port = process.env.port || 8090;
const app = express();

app.use(cors());
app.use(express.json());

// endpoint to get music by artist
app.get('/music', (req, res) => {
  const { artist } = req.query;
  const queriedMusic = musicData.filter(item => {
    return item.artistName.toLowerCase().indexOf(artist.toLowerCase()) !== -1;
  })
  res.json({ data: queriedMusic });
});
// app.get("/music", (req, res) => {
//   const { artist } = req.query;
//   if (artist) {
//     const filterArtist = musicData.filter(
//       (music) => music.artistName.toLowerCase().includes(artist.toLowerCase()),
//       res.json(filterArtist)
//     );
//   }
//   res.json(musicData);
// });


// endpoint to get one track
app.get("/music/:id", (req, res) => {
  const { id } = req.params;
  const music = musicData.find((item) => item.id === Number(id));
  if (!music) {
    res.status(404).send({ error: `No track with id ${id}was found` });
  } else {
    res.json({ data: music });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server is running on:${port}`);
});
