import express, { response } from 'express'
import cors from 'cors'

import topMusicData from './data/top-music.json'

const ERROR_MESSAGE_SONG = {error:'No song fund, try an other title.'}

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.json('🖤 Music endpoint starts here! 🖤')
})

// //all songs endpoint http://localhost:8080/music
// app.get('/music', (req, res) => {
//   const { song } = req.query
//   if (song) {
//     const musicList = topMusicData.filter(song => song.trackName.includes(song))
//     res.json(musicList)
//   } 
//   res.json(topMusicData)
// })

app.get('/music', (req, res) => {

  const { song, artist } = req.query

  if (song) {
    const songByTitle = topMusicData.filter(item => item.trackName.includes(song))
    if (songByTitle.length === 0){
      res.status(404).json(ERROR_MESSAGE_SONG)
    } else {
      res.json(songByTitle)
    }
  } else if (artist){
    const artistName = topMusicData.filter((item) => {
    return item.artistName.toLowerCase().indexOf(item.toLowerCase()) !== -1;
})
    res.json({ data: artistName });
  } else {
    res.json(topMusicData)
  }
  
})


// //http://localhost:8080/music/artists/j
// // Get all songs from an Artist No mather if its capital letters or full name, you get all songs fom artists with the same name.
// app.get('/music/artists/:artist', (req, res) => {
//   const { artist } = req.params
//   const artistName = topMusicData.filter((song) => {
//     return song.artistName.toLowerCase().indexOf(artist.toLowerCase()) !== -1;
// })
// res.json({ data: artistName });
// });




  
//dictionaryn of all kinds music genres
//v1- path param
app.get('/music/allgenres', (req, res) => {
  const genresDuplicated = topMusicData.map(item => item.genre);

  let genresUnique = [];
  genresDuplicated.forEach(item => {
    if (!genresUnique.includes(item)){
      genresUnique.push(item);
    }
  });
  res.json({ data:genresUnique})
});



//Sorted The 20 most popular songs, hight to low,
app.get('/music/popularity/best-20', (req, res) => {
  const sortOnMostPopular = topMusicData.sort(
    (a,b) => b.popularity - a.popularity
  );
  const mostPopluarSongArray = sortOnMostPopular.slice(0, 19);
  res.json(mostPopluarSongArray)
})

//Sorted The 20 least popular songs, low to high,
app.get('/music/popularity/lowest-20', (req, res) => {
  const sortOnLeastPopular = topMusicData.sort(
    (a,b) => a.popularity - b.popularity
  );
  const leastPopluarSongArray = sortOnLeastPopular.slice(0, 19);
  res.json(leastPopluarSongArray)
})


// endpoint 1 song http://localhost:8080/music/5
app.get('/music/:id', (req, res) => {
  const { id } = req.params
  const song = topMusicData.find( song => song.id === +id)
  if (!song) {
    res.status(404).send(`sorry, song id:{ id } can not be fund`)
  }
  res.json(song)
})

// Get all songs from a genre http://localhost:8080/music/pop
app.get('/music/genre/:genre', (req, res) => {
  const { genre } = req.params
  const song = topMusicData.filter((song) => song.genre === genre)
  res.json(song)
})

//http://localhost:8080/music/artists/j
// Get all songs from an Artist No mather if its capital letters or full name, you get all songs fom artists with the same name.
app.get('/music/artists/:artist', (req, res) => {
  const { artist } = req.params
  const artistName = topMusicData.filter((song) => {
    return song.artistName.toLowerCase().indexOf(artist.toLowerCase()) !== -1;
})
res.json({ data: artistName });
});

//get all songs with same energy http://localhost:8080/music/energy/41
app.get('/music/energy/:energy', (req, res) => {
  const { energy } = req.params
  const song = topMusicData.filter((song) => song.energy === +energy)
  res.json(song)
})




// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
