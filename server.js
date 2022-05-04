import express from 'express'
import cors from 'cors'

import netflixData from './data/netflix-titles.json'

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
	res.send('Hello world! Here you can find API for netflix-titles!')
})

app.get('/shows', (req, res) => {
	const { title, country, director, cast } = req.query

	let allShows = netflixData

	if (title) {
		allShows = allShows.filter((show) => show.title.toLowerCase() === title.toLowerCase())
	}
	if (country) {
		allShows = allShows.filter((show) => show.country.toLowerCase().includes(country.toLowerCase()))
	}
	if (director) {
		allShows = allShows.filter((show) => show.director.toLowerCase().includes(director.toLowerCase()))
	}
	if (cast) {
		allShows = allShows.filter((show) => show.cast.toLowerCase().includes(cast.toLowerCase()))
	}

	res.status(200).json({ response: allShows, success: true })
})

//Endpoint to get specific id
app.get('/shows/id/:id', (req, res) => {
	const { id } = req.params
	const titleById = netflixData.find((title) => title.show_id === +id)

	if (!titleById) {
		res.status(400).json({
			response: `There are no titles with id number ${id}`,
			success: false,
		})
	} else {
		res.status(200).json({
			response: titleById,
			success: true,
		})
	}
})

app.get('/shows/title/:title', (req, res) => {
	const { title } = req.params
	const titleByName = netflixData.filter(
		(titleName) => titleName.title.toLowerCase() === title.title.toLowerCase()
	)
	res.status(200).json(titleByName)
})

app.get('/shows/type/:type', (req, res) => {
	const { type } = req.params

	const typeOfShow = netflixData.filter((show) => show.type.toLowerCase() === type.toLowerCase())

	res.status(200).json(typeOfShow)
})

//Get random show endpoint
app.get('/random-show', (req, res) => {
	const randomTitle = netflixData[Math.floor(Math.random() * netflixData.length)]
	if (!randomTitle) {
		res.status(400).json({
			response: `There are no titles with id number`,
			success: false,
		})
	} else {
		res.status(200).json({
			response: randomTitle,
			success: true,
		})
	}
})

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`)
})
