import express from 'express'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

const port = process.env.PORT || 8000
const app = express()
const listEndpoints = require('express-list-endpoints')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json(listEndpoints(app));
})

app.get('/netflixTitles', (req, res) => {
  try {
    res.status(200).json({ response: netflixData, success: true });
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
    res.status(200).json({ response: titleById, success: true });
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
      if (titlesByYear.length > 0) {
        res.status(200).json({ response: titlesByYear, success: true });
      } else {
        res.status(404).json({ message: 'wrong query param use `Movie` or `TV Show` as query' });
      }
    }

    // case no titles in that year
    if (titlesByYear.length === 0) {
      res.status(404).json({ message: 'the year does not exist in our database' });
    }
    // positive response
    res.status(200).json({ response: titlesByYear, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
