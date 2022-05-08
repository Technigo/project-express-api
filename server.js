import express from 'express';
import cors from 'cors';

import songs from './data/top-music.json';

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
	const Home = {
		About: 'Top music API',
		Routes: [
			{
				'/songs': 'Get all songs',
				'/artists/{artist}': 'Get songs from artist',
				'/titles/{title}': 'Get song by title',
			},
		],
	};
	res.send(Home);
});

app.get('/songs', (req, res) => {
	res.status(200).json(songs);
});

app.get('/artists/:artist', (req, res) => {
	const { artist } = req.params;

	const songsByArtist = songs.filter(
		(songs) => songs.artistName.toLowerCase() === artist.toLowerCase()
	);

	res.status(200).json({
		data: songsByArtist,
		success: true,
	});
});

app.get('/titles/:title', (req, res) => {
	const { title } = req.params;
	const songByTitle = songs.filter(
		(song) => song.trackName.toLowerCase() == title.toLowerCase()
	);

	res.status(200).json({
		data: songByTitle,
		success: true,
	});
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
