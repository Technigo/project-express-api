import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'


// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

// Example of getting shows with limit
// app.get('/shows', (req, res)=>{
//   const limit = req.query.limit;
//   let showsReturned = netflixData;
//   if(limit){
//     showsReturned = showsReturned.slice(0,limit);
//   }
//   res.json(showsReturned);
// })


// {
//   "show_id": 81193313,
//   "title": "Chocolate",
//   "director": "",
//   "cast": "Ha Ji-won, Yoon Kye-sang, Jang Seung-jo, Kang Bu-ja, Lee Jae-ryong, Min Jin-woong, Kim Won-hae, Yoo Teo",
//   "country": "South Korea",
//   "date_added": "November 30, 2019",
//   "release_year": 2019,
//   "rating": "TV-14",
//   "duration": "1 Season",
//   "listed_in": "International TV Shows, Korean TV Shows, Romantic TV Shows",
//   "description": "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
//   "type": "TV Show"
//   }

// Path variable/path parameter
app.get('/shows/:id', (req, res) => {
  const showId = req.params.id;
  const show = netflixData.filter(item => item.show_id === +showId);
  console.log("id path parameter");
  res.json(show);
});

// Filter based on title AND/OR country 
// app.get('/shows', (req, res) => {
//   // Query parameter
//   const titleSearchString = req.query.title;
//   const countrySearchString = req.query.country;

//   let filteredShows = netflixData;

//   if (titleSearchString) {
//     filteredShows = filteredShows.filter(item => {
//       const itemTitle = item.title.toString();
//       return itemTitle.includes(titleSearchString)
//     });
//   }

//   if (countrySearchString) {
//     filteredShows = filteredShows.filter(item => {
//       const itemCountry = item.country.toString();
//       return itemCountry.includes(countrySearchString)
//     });
//   }

//   res.json(filteredShows);
// });

// Filter based on title OR country OR description
app.get('/shows', (req, res) => {
  // Query parameter
  const searchString = req.query.search;

  let filteredShows = netflixData;

  if (searchString) {
    // Filter once on multiple fields
    filteredShows = filteredShows.filter(item => {
      const itemTitle = item.title.toString();
      const itemCountry = item.country.toString();
      const itemDescription = item.description.toString();
      return itemTitle.includes(searchString) ||
        itemCountry.includes(searchString) || 
        itemDescription.includes(searchString);
    });
  }


  res.json(filteredShows);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
