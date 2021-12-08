import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.json(topMusicData)

  // music?firstQuery=value
  // console.log(req.query)
})

app.get('/music', (req, res) => {
  // res.json(topMusicData)

  const { artist, genre } = req.query

  let musicToSend = topMusicData

  if (artist) {
    musicToSend = musicToSend.filter(
      (item) =>
        item.artistName.toLowerCase().indexOf(artist.toLowerCase()) !== -1
    )
  }

  if (genre) {
    musicToSend = topMusicData.filter(
      (item) => item.genre.toLowerCase().indexOf(genre.toLowerCase()) !== -1
    )
  }

  res.json({
    response: musicToSend,
    success: true,
  })
})

app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/music/id/:id', (req, res) => {
  const { id } = req.params

  const musicId = topMusicData.find((music) => music.id === +id)

  if (!musicId) {
    res.status(404).json({
      response: 'No music found with that id...',
      success: false,
    })
  } else {
    res.status(200).json({
      response: musicId,
      success: true,
    })
  }
})

app.get('/music/artists/:artist', (req, res) => {
  const { artist } = req.params

  const artistByName = topMusicData.find(
    (item) => item.artistName.toLowerCase() === artist.toLowerCase()
  )

  if (!artistByName) {
    res.status(404).json({
      response: 'No artists found with that name...',
      success: false,
    })
  } else {
    res.status(200).json({
      response: artistByName,
      success: true,
    })
  }
})

app.get('/music/track/:track', (req, res) => {
  const { track } = req.params

  const trackByName = topMusicData.find(
    (item) => item.trackName.toLowerCase() === track.toLowerCase()
  )

  if (!trackByName) {
    res.status(404).json({
      response: 'No tracks found with that name...',
      success: false,
    })
  } else {
    res.status(200).json({
      response: trackByName,
      success: true,
    })
  }
})

app.get('/music/genre/:genre', (req, res) => {
  const { genre } = req.params

  const genreByName = topMusicData.find((item) => item.genre === genre)

  if (!genreByName) {
    res.status(404).json({
      response: 'No genre found with that name...',
      success: false,
    })
  } else {
    res.status(200).json({
      response: genreByName,
      success: true,
    })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})

//--------------------------------------------------------------------------//

// get a list of the companies with fundings (from json file)
// app.get('/fundings', (req, res) => {
//   const { company, region } = req.query

//   let techFundingsToSend = techFundings

//   if (company) {
//     techFundingsToSend = techFundingsToSend.filter(
//       (item) => item.Company.toLowerCase().indexOf(company.toLowerCase()) !== -1
//     )
//   }

//   if (region) {
//     techFundingsToSend = techFundings.filter(
//       (item) => item.Region.toLowerCase().indexOf(region.toLowerCase()) !== -1
//     )
//   }

//   res.json({
//     response: techFundingsToSend,
//     success: true,
//   })
// })

// // get a specific company based on id, using param
// app.get('/fundings/id/:id', (req, res) => {
//   const { id } = req.params

//   const companyId = techFundings.find((company) => company.index === +id)

//   if (!companyId) {
//     res.status(404).send('No company found with that id')
//   } else {
//     res.json(companyId)
//   }
// })

// app.get('/fundings/company/:company', (req, res) => {
//   const { company } = req.params

//   const companyByName = techFundings.find((item) => item.Company === company)

//   if (!companyByName) {
//     res.status(404).json({
//       response: 'No company found with that name',
//       success: false,
//     })
//   } else {
//     res.status(200).json({
//       response: companyByName,
//       success: true,
//     })
//   }
// })

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port} YAY YAY`)
// })
