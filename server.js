import express from 'express'
import cors from 'cors'
import expressListEndpoints from 'express-list-endpoints'

import topMusicData from './data/top-music.json'

const port = process.env.PORT || 8080
const app = express()

//middleware
app.use(cors())
app.use(express.json())

//routes

//showing documentation of endpoints
app.get('/', (req, res) => {
	const endpoints = expressListEndpoints(app)
	res.json(endpoints)
})

//route that shows all data from jsonfile
app.get('/songs', (req, res) => {
	res.json(topMusicData)
})

//route to find and show song by id
app.get('/songs/:songId', (req, res) => {
	const { songId } = req.params

	const song = topMusicData.find((song) => +songId === song.id)

	if (song) {
		res.json(song)
	} else {
		res.status(404).send('song not found')
	}
})

// route to map all the artists names
app.get('/artists', (req, res) => {
	const artistNames = topMusicData.map((song) => song.artistName)

	if (artistNames.length > 0) {
		res.json(artistNames)
	} else {
		res.status(404).send('No artists found')
	}
})

//route to sort all the songs by popylarity
app.get('/favorites', (req, res) => {
	const popular = topMusicData.sort((a, b) => +b.popularity - +a.popularity)

	if (popular.length > 0) {
		res.json(popular)
	} else {
		res.status(404).send('could not sort by popularity')
	}
})

//route to sort by popularity and show the top ten songs by slice
app.get('/favorites/top10', (req, res) => {
	const top10Songs = topMusicData
		.sort((a, b) => +b.popularity - +a.popularity)
		.slice(0, 10)

	if (top10Songs.length > 0) {
		res.json(top10Songs)
	} else {
		res.status(404).send('could not show top 10 songs')
	}
})

//route to filter bpm 128 = sweet spot
app.get('/bpms', (req, res) => {
	const sweetSpot = topMusicData.filter(
		(song) => song.bpm >= 124 && song.bpm <= 135
	)
	if (sweetSpot.length > 0) {
		res.json(sweetSpot)
	} else {
		res.status(404).send('could not find the perfect bpm')
	}
})

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`)
})
