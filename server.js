import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import netflixData from './data/netflix-titles.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json('Index page')
})

app.get ('/endpoints', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/catalogue', (req, res) => {
  const { netflixTitle, netflixYear } = req.query

  let netflixDataToSend = netflixData
  
  if (netflixTitle) {
    netflixDataToSend = netflixDataToSend.filter(
      (item) => item.title.toLowerCase().indexOf(netflixTitle.toLowerCase()) !== -1
    )
  }

  if (netflixYear) {
    netflixDataToSend = netflixDataToSend.filter(
      (item) => item.release_year === +netflixYear
    )
  }

  res.json({
    response: netflixDataToSend,
    success: true,
  })
})

app.get('/catalogue/ids/:netflixId', (req, res) => {
  const { netflixId } = req.params

  const titleId = netflixData.find(item => item.show_id === +netflixId)

  if (!titleId) {
    res.status(404).send('No title by that id was found.')
  } else {
    res.json(titleId)
  }
})

app.get('/catalogue/names/:netflixTitle', (req, res) => {
  const { netflixTitle } = req.params
  
  const titleName = netflixData.find(item => item.title.toLowerCase() === netflixTitle.toLowerCase())

  if (titleName) {
    res.status(200).json({
      response: titleName,
      success: true,
    })
  } else {
    res.status(404).json({
      response: 'No title by that name was found.',
      success: false,
    })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
