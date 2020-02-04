import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data/best-artworks.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// app.get('/art', (req, res) => {
//   // res.send('Hello world')
//   res.json(data)
//   // genre
//   // country
// })

app.get('/genre/:genre', (req, res) => {
// artist name
const genre = req.params.genre
const showGenre = data.filter(artist => artist.genre === genre)
res.json(showGenre)
})

// Filter based on title OR country OR name
// .com/art?search=impressionism
// .com/art?search=Monet
app.get('/art', (req, res) => {
  // res.json(data)
  // Query parameter
  const searchString = req.query.search;

  let filteredArt = data;

  if (searchString) {
    // Filter once on multiple fields
    filteredArt = data.filter(artist => {
      const artistName = artist.name.toString();
      const artistNationality = artist.nationality.toString();
      const artistGenre = artist.genre.toString();
      return artistName.includes(searchString) ||
        artistNationality.includes(searchString) || 
        artistGenre.includes(searchString);
    });
  }
  res.json(filteredArt);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

// {
//   "id": 0,
//   "name": "Amedeo Modigliani",
//   "years": "1884 - 1920",
//   "genre": "Expressionism",
//   "nationality": "Italian",
//   "bio": "Amedeo Clemente Modigliani (Italian pronunciatione.",
//   "wikipedia": "http://en.wikipedia.org/wiki/Amedeo_Modigliani",
//   "paintings": 193
// }