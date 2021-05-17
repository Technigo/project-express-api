import express, { response } from 'express'
import cors from 'cors'


import topMusicData from './data/top-music.json'

const ERROR_MESSAGE_SONG = {error:'No song fund, try an other title.'}

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json());

// dummy endpoint
app.get('/', (req, res) => {
  res.json('🖤 Music endpoint starts here! 🖤, List of all traks with info: /music. List of all music genres: /music/allgenres. All songs by one artist or a song by title:music/info?title=(songs title) or music/info?artist=U(name of artist) Get all songs from an Artist no matter spelling: /music/artists/:artist(add name). Get all songs from a genre /music/genre/pop (or rock or something else). All songs with same energy: /music/energy/ and a number. Sorted The 20 least popular songs, low to high: /music/popularity/lowest-20. Sorted The 20 most popular songs, hight to low; /music/popularity/best-20. ' )
})

//all songs endpoint http://localhost:8080/music
app.get('/music', (req, res) => {
  const { song } = req.query
  if (song) {
    const musicList = topMusicData.filter(song => song.trackName.includes(song))
    res.json(musicList)
  } 
  res.json(topMusicData)
})

// http://localhost:8080/music/info?artist=shaw

app.get('/music/info', (req, res) => {
  const { title, artist } = req.query;
  let musicToSend = topMusicData;
  
  if (title) {
    musicToSend = musicToSend
    .filter(music => music.trackName.toLowerCase().includes(title.toLowerCase()));
  } 
  if (artist) {
    musicToSend = musicToSend
    .filter(music => music.artistName.toLowerCase().includes(artist.toLowerCase()));
  }
  res.json({ length: musicToSend.length, data: musicToSend})
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

  
//dictionary of all kinds of music genres
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
    res.status(404).send(`sorry, that song can not be fund`)
  }
  res.json(song)
})

// Get all songs from a genre http://localhost:8080/music/pop
app.get('/music/genre/:genre', (req, res) => {
  const { genre } = req.params
  const song = topMusicData.filter(song => song.genre === genre)
  res.json(song)
})

http://localhost:8080/music/artists/j
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
