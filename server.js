import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import netflixData from './data/netflix-titles.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

const ERROR_CATEGORY_NOTFOUND = { error : 'No such category. Try Movie or TV Show.' }


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8084
const app = express()


// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Netflix API')
});

// 1 // Return a collection (array) of elements - It is productions somehow, so I choosed to naming it productions. 
app.get('/productions', (req, res) => {
  res.json(netflixData)
});


// 2 // Find Single (specific by id) production on Netflix
app.get('/productions/:id', (req, res) => {
  const id = req.params.id;
  const production = netflixData.find(
    (production) => production.show_id === +id);
    res.json(production)
});

// 3 // Map on directors, sort in alfabetic order and then filter to avoid empty values.  
app.get('/directors', (req, res) => {
  const directors = req.params.directors;
  const directorsOfProductions = netflixData.map(
    (director) => director.director
    ).sort();
  
  const directorsArray = directorsOfProductions.filter(item => item);

    res.json(directorsArray)
});

// 4 // Filter on release-year
app.get('/release/:year', (req, res) => {
  const year = req.params.year;
  const netflixReleaseYear = netflixData.filter(
    (item) => item.release_year === +year
    );
    res.json(netflixReleaseYear)
});

// 5 // Filter on categories (ex. Movie, TV Shows ... ) + Error-message if not found
app.get('/content/:category', (req, res) => {
  const { category } = req.params;
  const filteredOnCategory = netflixData.filter(
    (content) => content.type === category
    );

    if (filteredOnCategory.length === 0){
      res.status(404).json(ERROR_CATEGORY_NOTFOUND)
    } else {
      res.json(filteredOnCategory)
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
