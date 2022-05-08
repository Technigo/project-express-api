import express from "express";
import cors from "cors";
import { json } from "express/lib/response";
import netflixData from "./data/netflix-titles.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    const welcomePage = {
      Hello:
      "Hello there! Here you'll find an API with information about 1 375 Netflix movies and TV-shows!",
      Routes: [{
        "/content": "GET the whole array of movies and tv-shows",
        "/content/id/'id-number": "GET a specific movie/tv-show by it's unique id-number",
        "/content/title/'title of movie/show": "GET movies/tv-shows by title",
        "/content/director/'director of movie/show": "GET movies/tv-shows by director",
        "/content/type/movies": "GET whole array of movies",
        "/content/type/shows": "GET whole array of tv-shows",
      }]
    }
  res.send(welcomePage)
  });

app.get('/content', (req, res) => {
  const { show_id, title, director, type } = req.query;
  
  let allContent = netflixData;
  
  if (show_id) {
    allContent = allContent.find(
      (content) => content.show_id === +show_id
      );
  };

  if (title) {
    allContent = allContent.filter(
      (content) => content.title.toLowerCase() === title.toLowerCase()
      );
  };
    
  if (director) {
    allContent = allContent.filter(
      (content) => content.director.toLowerCase() === director.toLowerCase()
      );
  }
    
  if (type) {
    allContent = allContent.filter(
      (content) => content.type.toLowerCase() === type.toLowerCase()
    );
  }
      
  res.status(200).json({
    data: allContent,
    success: true,
  });
  
});


app.get("/content/id/:show_id", (req, res) => {
  const { show_id } = req.params;

  const contentById = netflixData.find(
    (content) => content.show_id === +{show_id}
  );

  if (contentById) {
    res.status(200).json({
      data: contentById,
      success: true,
    });
  } else {
    res.status(404).json({
      data: "The movie/tv-show you're looking for is not here.. Are you sure you've entered the correct id-number?",
      success: false,
    })
  }
        
});
    
app.get("/content/:title", (req, res) => {
  const { title } = req.params;

  const contentByTitle = netflixData.filter(
    (content) => content.title.toLowerCase() === title.toLowerCase()
  );
      
  if (contentByTitle) {
    res.status(200).json({
      data: contentByTitle,
      success: true,
    });
  } else {
      res.status(404).json({
        data: "The movie/tv-show you're looking for is not here.. Are you sure you've entered the correct title?",
        success: false,
      })
  };

});


app.get("/content/director:director", (req, res) => {
  const { director } = req.params;

  const contentByDirector = netflixData.filter(
    (content) => content.director.toLowerCase().includes(director.toLowerCase())
  );

  if (contentByDirector) {
    res.status(200).json({
      data: contentByDirector,
      success: true,
    });
  } else {
      res.status(404).json({
        data: "This is not the director you're looking for.. Try again you shall.",
        success: false,
      })
  };
        
});

app.get("/content/type:type", (req, res) => {
  const { type } = req.params;

  const contentByType = netflixData.filter(
    (content) => content.type.toLowerCase().includes(type.toLowerCase())
  );
        
  res.status(200).json({
    data: contentByType,
    success: true,
  });
        
});
      
      
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
