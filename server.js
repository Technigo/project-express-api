import express from "express";
import cors from "cors";
import netflixTitlesData from "./data/netflix-titles.json";

console.log(netflixTitlesData);

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get('/titles', (req, res) => {
  res.json(netflixTitlesData)
})

// Search by show id
app.get('/:id', (req, res) => {
  const { id } = req.params;
  const idForShow = netflixTitlesData.find((title) => {
    return title.show_id === Number(id);
  });
  if (idForShow) {
    res.status(200).json({
      success: true,
      message: "Title with provided ID found.",
      body: {
        title: idForShow
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Title with provided ID not found.",
      body: {}
    });
  }
});

// Search by title
app.get('/title/:title', (req, res) => {
  const { title } = req.params;
  const titleForShow = netflixTitlesData.filter((item) => {
    return item.title.toLowerCase().includes(title.toLowerCase());
  });
  if (titleForShow.length) {
    res.status(200).json({
      success: true,
      message: "Titles found with the provided title",
      body: {
        title: titleForShow
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No titles found with the provided title",
      body: {}
    });
  }
});

// Search by partial title
app.get('/search/title/:word', (req, res) => {
  const { word } = req.params;
  const titles = netflixTitlesData.filter(title => {
    const words = title.title.toLowerCase().split(' ');
    return words.includes(word.toLowerCase());
  });
  if (titles.length) {
    res.status(200).json({
      success: true,
      message: "Titles found with the provided word",
      body: {
        titles
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No titles found with the provided word",
      body: {}
    });
  }
});

// Search by director
app.get('/director/:director', (req, res) => {
  const { director } = req.params;
  const directorForShow = netflixTitlesData.filter((item) => {
    return item.director.toLowerCase().includes(director.toLowerCase());
  });
  if (directorForShow.length) {
    res.status(200).json({
      success: true,
      message: "Titles found with the provided director",
      body: {
        title: directorForShow
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No titles found with the provided director",
      body: {}
    });
  }
});

// Search by cast
app.get('/cast/:cast', (req, res) => {
  const { cast } = req.params;
  const castForShow = netflixTitlesData.filter((item) => {
    return item.cast.toLowerCase().includes(cast.toLowerCase());
  });
  if (castForShow.length) {
    res.status(200).json({
      success: true,
      message: "Titles found with the provided cast",
      body: {
        title: castForShow
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No titles found with the provided cast",
      body: {}
    });
  }
});

// Search by country
app.get('/country/:country', (req, res) => {
  const { country } = req.params;
  const countryForShow = netflixTitlesData.filter((item) => {
    return item.country.toLowerCase().includes(country.toLowerCase());
  });
  if (countryForShow.length) {
    res.status(200).json({
      success: true,
      message: "Titles found with the provided country",
      body: {
        title: countryForShow,
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No titles found with the provided country",
      body: {}
    });
  }
});

//Search by date added
app.get('/date_added/:date_added', (req, res) => {
  const { date_added } = req.params;
  const dateAddedForShow = netflixTitlesData.filter((item) => {
    return item.date_added.toLowerCase().includes(date_added.toLowerCase());
  });
  if (dateAddedForShow.length) {
    res.status(200).json({
      success: true,
      message: "Titles found with the provided add date",
      body: {
        title: dateAddedForShow
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No titles found with the provided add date",
      body: {}
    });
  }
});

// Search by release year
app.get('/release_year/:release_year', (req, res) => {
  const { release_year } = req.params;
  const releaseYearForShow = netflixTitlesData.filter((title) => {
    return title.release_year === Number(release_year);
  });
  if (releaseYearForShow.length) {
    res.status(200).json({
      success: true,
      message: "Titles found with the provided release year",
      body: {
        title: releaseYearForShow
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No titles found with the provided release year",
      body: {}
    });
  }
});

// Search by rating
app.get('/rating/:rating', (req, res) => {
  const { rating } = req.params;
  const ratingForShow = netflixTitlesData.filter((item) => {
    return item.rating.toLowerCase().includes(rating.toLowerCase());
  });
  if (ratingForShow.length) {
    res.status(200).json({
      success: true,
      message: "Titles found with the provided rating",
      body: {
        title: ratingForShow
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No titles found with the provided rating",
      body: {}
    });
  }
});

//Search by duration
app.get('/duration/:duration', (req, res) => {
  const { duration } = req.params;
  const durationForShow = netflixTitlesData.filter((item) => {
    return item.duration.toLowerCase().includes(duration.toLowerCase());
  });
  if (durationForShow.length) {
    res.status(200).json({
      success: true,
      message: "Titles found with the provided duration",
      body: {
        title: durationForShow
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No titles found with the provided duration",
      body: {}
    });
  }
});

// Search by genre
app.get('/listed_in/:listed_in', (req, res) => {
  const { listed_in } = req.params;
  const ListedInForShow = netflixTitlesData.filter((item) => {
    return item.listed_in.toLowerCase().includes(listed_in.toLowerCase());
  });
  if (ListedInForShow.length) {
    res.status(200).json({
      success: true,
      message: "Titles found with the provided listed in",
      body: {
        title: ListedInForShow
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No titles found with the provided listed in",
      body: {}
    });
  }
});

//Search by description
app.get('/description/:description', (req, res) => {
  const { description } = req.params;
  const descriptionForShow = netflixTitlesData.filter((item) => {
    return item.description.toLowerCase().includes(description.toLowerCase());
  });
  if (descriptionForShow.length) {
    res.status(200).json({
      success: true,
      message: "Titles found based on the description provided",
      body: {
        title: descriptionForShow
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: " No titles found based on the description provided",
      body: {}
    });
  }
});

// Search by type
app.get('/type/:type', (req, res) => {
  const { type } = req.params;
  const typeForShow = netflixTitlesData.filter((item) => {
    return item.type.toLowerCase().includes(type.toLowerCase());
  });
  if (typeForShow.length) {
    res.status(200).json({
      success: true,
      message: "Titles found based on the type provided",
      body: {
        title: typeForShow
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No titles found based on the type provided",
      body: {}
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
