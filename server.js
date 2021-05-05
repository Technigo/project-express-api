  
import express from 'express'
//import bodyParser from 'body-parser'
import cors from 'cors'

import conversationsData from './data/conversations.json'
//console.log(conversationsData.length) //4563 objekt ca 1303 konversationer. 

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello and welcome to this API - documentation to come here as well as on GitHub // or just program a frontend please ?! What I have time for. Here can be a link')
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})