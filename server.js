import express from "express";
import cors from "cors";
// import technigoMembers from "./data/technigo.json";
// import data from "./data/netflix-titles.json";

import tedTalkData from "./data/ted-talks.json";
// If you're using one of our datasets, uncomment the appropriate import below
// to get started! 
// NB3: This in the import nr 2
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";

// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on.
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start ROUTE on defalt port 8080.
// --------skapa mer detaljerat meddelande med alla endpoints-----------
app.get("/", (req, res) => {
   res.json({responseMassage: "Hello Everybody, welcome!"});
  //  const navigation = {
  //   guide: "These are the routes for this book API!",
  //   Endpoints: [
  //     {
  //       "/bookData": "Display all books",
  //       "/bookData/authors/:authors": "Search for a author",
  //       "/bookData/title/:title": "Search for a title", 
  //       "/bookData/average_rating/": "Average rating of books - high to low",
  //       "/bookData/num_pages/": "The book with most number of pages",
  //     },
  //   ],
  // };
  // res.send(navigation);
});

// ROUTE 1 - collection of results (array of elements)
app.get("/allTedTalks", (req, res) => {
  res.status(200).json(tedTalkData); 
});

// ROUTE 2 - collection of results (array of elements) using filter
// ex /tedTalks?speaker=hans rosling
app.get("/tedTalks", (req, res) => {
  const { title, speaker, event } = req.query;
 
  let tedTalks = tedTalkData.slice(0, 8)

  if (title) {
  tedTalks = tedTalks.filter((tedTalk) => {
    return tedTalks.title.toLowerCase() === title.toLowerCase()});
  }
  if (speaker) {
    tedTalks = tedTalks.filter((tedTalk) => {
      return tedTalks.speaker.toLowerCase() === speaker.toLowerCase()});
  }
  if (event) {
    tedTalks = tedTalks.filter((tedTalk) => {
      return tedTalks.event.toLowerCase() === event.toLowerCase()});
  }

  res.status(200).json({
    success: true,
    massage: "OK",
    body: {
      tedTalkData: tedTalks
    }
  });
  // console.log(tedTalks);
}); 

// Route 3 -  id, return a single result

app.get("/tedTalk/:id", (req, res) => {
  const singleTedTalk = tedTalkData.find((talk) => {
    return talk.talk_id === +req.params.id;
  }); 
  // res.status(200).json(singleMovie);
    
  if(singleTedTalk) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        talk: singleTedTalk
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Not Found",
      body: {}
    })
  }
   
});

// ROUTE 4 Two filters - see won movies in a specific year
// ----------skapa specifik filtrering----------
// app.get("/year/:year", (req, res) => {
//   const year = req.params.year
//   const showWin = req.query.win
//   let nominationsFromYear = goldenGlobesData.filter ((item) => item.year_award === +year)

// if (showWin) {
//   nominationsFromYear = nominationsFromYear.filter ((item) => item.win)
// }
//   res.json(nominationsFromYear)
// })

// // --------Netflix ----------------------------

// app.get("/allMovies", (req, res) => {
//   const { title, director, duration } = req.query;
 
//   let allMovies = data.slice(0, 5)

//   if (title) {
//   allMovies = allMovies.filter((movies) => {
//     return movies.title.toLowerCase() === title.toLowerCase()});
//   }
//   if (director) {
//     allMovies = allMovies.filter((movies) => {
//       return movies.director.toLowerCase() === director.toLowerCase()});
//   }
//   if (duration) {
//     allMovies = allMovies.filter((movies) => {
//       return movies.duration.toLowerCase() === duration.toLowerCase()});
//   }

//   res.status(200).json({
//     success: true,
//     massage: "OK",
//     body: {
//       data: allMovies
//     }
//   });
//   // console.log(allMovies);
// });   

// // Route 2 -  id, return a single result

// app.get("/movie/:id", (req, res) => {
//   const singleMovie = data.find((movie) => {
//     return movie.show_id === +req.params.id;
//   }); 
//   // res.status(200).json(singleMovie);
    
//   if(singleMovie) {
//     res.status(200).json({
//       success: true,
//       message: "OK",
//       body: {
//         movie: singleMovie
//       }
//     });
//   } else {
//     res.status(404).json({
//       success: false,
//       message: "Not Found",
//       body: {}
//     })
//   }
   
// });

// -------------------------------------

// ----skapa en random val av tedtalk, -------------------
// // random movie title
// app.get("/random-movie", (req,res) => {
//   const randomMovie = data[Math.floor(Math.random()* data.length)]
//   if(!randomMovie) {
//     res.status(404).json({
//       data: "Opps, we couldnt find any random movie right now. Please try again.",
//       success: false, 
//     })
//   } else {
//     res.status(200).json({
//       data: randomMovie,
//       success: true,
//     })
//   }
// })



// NBStart the server, port = (const port = process.env.PORT || 8080;) längst upp.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// ------ändra "duration" till hur många minuter tedtalket är