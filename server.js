import express, { response } from 'express';
import cors from 'cors';
import imdbData from './data/imdb-top-250-movies.json';
import listEndpoints from 'express-list-endpoints';

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here

//listEndpoints shows which possible endpoints our app has
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
  // res.send('Hello test!');
});

//First route which shows all movies
app.get('/topmovies', (req, res) => {
  res.json(imdbData);
});

// Didn't get this one to work, but will try it later.
// app.get('/topmovies', (req, res) => {
// 	const { genre, director, writer  } = req.query
// 	let filteredMovies = imdbData
	
// 	if(genre) {
// 		filteredMovies.filter((item) => 
// 			item.genre.toLocaleLowerCase()
// 			.includes(genre.toLocaleLowerCase()))
// 	}
// 	if(director) {
// 		filteredMovies.filter((item) => 
// 			item.director.toLocaleLowerCase()
// 			.includes(director.toLocaleLowerCase()))
// 	}

//   if(writer) {
// 		filteredMovies.filter((item) => 
// 			item.writer.toLocaleLowerCase()
// 			.includes(writer.toLocaleLowerCase()))
// 	}
	
// 	if(filteredMovies.length === 0) {
// 		res.status(404)
// 			.json("Sorry we couldn't find what you seek")
// 	} else {
// 		res.json(filteredMovies)
// 	}

// }
// )

//Second route which filters movies based on the release year

app.get('/years/:year', (req, res) => {
  const year = req.params.year
  const releaseYear = imdbData.filter((item) => item.year === +year)
  console.log(releaseYear)
  //adding a plus in front of year turns our string into number

  res.json(releaseYear)
});

//Third route which makes it possible to search for a specific movie

app.get('/titles/:title', (req, res) => {
  const title  = req.params.title
  
  let titleSearch = imdbData.filter(item => item.title === title)
    
  if (titleSearch.length === 0) {
    res.status(404).json({
      success: false,
      message: `No movie with the name ${title} was found`,
      body: { } 
    })
  } else {
    res.status(200).json({
      success: true,
      message: `Here's ${title}.`,
      body: {
        title: titleSearch
      }
    })
  }
})
//Fourth route which makes it possible to search for a movie based on its rank
app.get('/ranks/:rank', (req, res) => {
  const rank = req.params.rank
  const rankId = imdbData.filter((item) => item.rank === +rank)
  console.log(rankId)

  res.json(rankId)
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
