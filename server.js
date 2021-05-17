import express, { request, response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import musicData from "./data/top-music.json";

const port = process.env.port || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(musicData);
});

app.get("/music", (req, res) => {
  const { artist } = req.query;
  if (artist) {
    const filterArtist = musicData.filter((item) =>
      item.artistName.includes(artist)
    );
    res.json(filterArtist);
  }
  res.json(musicData);
});

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
