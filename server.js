import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import goldenGlobesData from './data/golden-globes.json'
// import netflixData from './data/netflix-titles.json'

// Defining the port 
const port = process.env.PORT || 8080
const app = express()

// Adding middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Starting defining routes 
app.get('/', (req, res) => {
  /* res.json(goldenGlobesData) */
  res.end('First backend project') 
})

// Filter based on title from code along with Van (netflix file)

/* app.get('/shows', (req, res) => {
  
  const titleSearchString = req.query.title;

  let filteredShows = netflixData;

  if (titleSearchString) {
    filteredShows = filteredShows.filter(item => {
      const itemTitle = item.title.toString();
        return itemTitle.includes(titleSearchString)
    });
  }

  res.json(filteredShows);
  }); */

app.get('/winners', (_, res) => {

  let winners = goldenGlobesData.filter(item => {
    return item.win === true
  })
  
  res.json(winners)

})  

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
