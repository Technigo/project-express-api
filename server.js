import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import goldenGlobesData from './data/golden-globes.json'

const data = goldenGlobesData

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example: PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

app.use(cors())// Add middlewares to enable cors and json body parsing
app.use(express.json())

app.get('/', (req, res) => {// This is an endpiont, and it takes two arguments. First a path and then a call back function
  res.send('Welcome to the Golden-Globes API. Enter /endpoints to see which endpoints there are.')
})

app.get('/endpoints', (req, res) => {//this endpoint is going to tell us all possible endpoint we have
  res.send(listEndpoints(app))
})

app.get('/nominations', (req, res) => {  //here I put a function to pass two arguments: request and use response to add stuff to it
  res.json(data)
})

app.get('/nominations/nominee/:nominee', (req, res) => {
  const { nominee } = req.params
  const nomineeId = goldenGlobesData.find(item => item.nominee.toLowerCase() === nominee.toLowerCase())

  if(!nomineeId) {
    console.log('No nominee')
    res.status(404).json({
      response: 'No nominee found with that name.',
      success: false
    })
  }  else { 
    res.json(nomineeId)
    }  
})

app.get('/nominations/category/:category', (req, res) => {
  const { category } = req.params
  const categoryId = goldenGlobesData.find(item => item.category.toLowerCase() === category.toLowerCase())
  
  if(!categoryId) {
    console.log('nothing found')
    res.status(404).json({
      response: 'No category found with that name.',
      success: false    
    })
  }  else { 
    res.json(categoryId)
    }
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showWin = req.query.win
  let nominationsFromYear = data.filter((item) => item.year_award === +year)
  
  if (!showWin) {
    res.status(404).json({
      response: 'No award found in given year',
    success: false
    })
  } else { 
    nominationsFromYear =  nominationsFromYear.filter((item) => item.win)
    }
  
  res.json(nominationsFromYear)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
