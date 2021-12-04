import express from 'express'
import cors from 'cors'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!

// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Route base /')
})

app.get('/netflixTitles', (req, res) => {
  try {
    res.send(netflixData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.get('/netflixTitles/:id', (req, res) => {
  try {
    const { id } = req.params;
    const titleById = netflixData.find((item) => item.show_id === +id);
    
    if (!titleById) {
      res.status(404).json({ message: 'id does not exist in our database' });
    } 
    res.send(titleById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.get('/netflixTitles/year/:year', (req, res) => {
  try {
    const { year } = req.params;
    let titlesByYear = netflixData.filter((item) => item.release_year === +year);
    
    // case exists query param
    const { type } = req.query;
    if (type) {
      titlesByYear = titlesByYear.filter((item) => item.type === type);
      if (titlesByYear) {
        res.send(titlesByYear);
      } else {
        res.status(404).json({ message: 'wrong query param use `Movie` or `TV Show` as query' });
      }
    }

    // case no titles in that year
    if (titlesByYear.length === 0) {
      res.status(404).json({ message: 'the year does not exist in our database' });
    }
    // positive response
    res.send(titlesByYear);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
