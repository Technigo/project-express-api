import express from "express";
import cors from "cors";
// import technigoMembers from "./data/technigo.json";
import tedTalkData from "./data/ted-talks.json";


// Defines the port the app will run on.
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start ROUTE on defalt port 8080.

app.get("/", (req, res) => {
   res.send({
    responseMassage: "Hello Everybody and welcome!",
    guide: "These are the routes for this TED Talk API!",
    Endpoints:"",
    Routes:[{
        "/allTedTalks": "All TED Talks",
        "/speakers": "All TED Talk speakers, and how many",
        "/speakers/:speaker/talks": "TED Talks from a Requested speaker, and how many", 
        "/events": "All TED Talk events",
        "/tedTalk/:id": "search for a TED Talk with specific Id",
        "/tedTalks/mostViewedTedTalk": "How many views has the most popular talk?",
        "/randomTedTalk": "Press enter and get a random TED Talk"
      }],
    Querys: [{
      "/tedTalks": "Filter by title, speaker and/or event, amoung a selected amount (500) of talks ex. /tedTalks?speaker=al gore&event=ted2006",
    }]
  });
});

// Route 1 - collection of results (array of elements)
app.get("/allTedTalks", (req, res) => {
  res.status(200).json(tedTalkData); 
});

// Route 2 all speakers list

app.get("/speakers", (req, res) => {
  const allSpeakers = tedTalkData.map((talk) => talk.speaker);
  // New set to remove all dublicates
  const allSpeakersSet = Array.from(new Set(allSpeakers));
  if (allSpeakersSet){
    res.status(200).json({
      success: true,
      message: "All TED Talk spekers",
      'Total amount of categories': allSpeakersSet.length,
      body: {
          tedTalkData: allSpeakersSet
      }
    })
  }
});

// Route 3 talks by requested speakers list
// ex /speaker/hans rosling/talks

app.get("/speakers/:speaker/talks", (req, res) => {
   const talksBySpeaker = tedTalkData.filter((talkSpeaker) => {
    return talkSpeaker.speaker.toLowerCase() === req.params.speaker.toLowerCase();
  })
  if (talksBySpeaker) {
    res.status(200).json({
      success: true,
      message: "All TED Talks by requested speker",
      'Amount of talks': talksBySpeaker.length,
      body: {
        tedTalkData: talksBySpeaker
      }
    })
  }
});

// Route 4 All TED Talk Events list
// ex /events

app.get("/events", (req, res) => {
  const allEvents = tedTalkData.map((talkEvent) => talkEvent.event);
  // New set to remove all dublicates
  const allEventsSet = Array.from(new Set(allEvents));

  if (allEventsSet) {
    res.status(200).json({
      success: true,
      message: "All TED Talk Events",
      'Total amount of events': allEventsSet.length,
      body: {
        tedTalkData: allEventsSet,
      }
    });
  }
});

// Route 5 -  id, return a single result
// ex /tedTalk/7

app.get("/tedTalk/:id", (req, res) => {
  const singleTedTalk = tedTalkData.find((talk) => {
    return talk.talk_id === +req.params.id;
  }); 
  // "/tedTalk/id/:id"
  // const id = req.params.id
  // let singleTedTalk = tedTalkData.find((talk) => talk.talk_Id === +id)
 
    
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
      message: "Sorry, no TED Talk with that specific number, try again",
      body: {}
    })
  }
   
});

// Route 6 - collection of results (array of elements) using filter
// ex /tedTalks?speaker=al gore&event=Ted2006
app.get("/tedTalks", (req, res) => {
  const { title, speaker, event } = req.query;
 
  let tedTalks = tedTalkData.slice(0, 500)

  if (title) {
  tedTalks = tedTalks.filter((tedTalk) => {
    return tedTalk.title.toLowerCase() === title.toLowerCase()});
  }
  if (speaker) {
    tedTalks = tedTalks.filter((tedTalk) => {
      return tedTalk.speaker.toLowerCase() === speaker.toLowerCase()});
  }
  if (event) {
    tedTalks = tedTalks.filter((tedTalk) => {
      return tedTalk.event.toLowerCase() === event.toLowerCase()});
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

// Route 7 How many views does the most popular TED Talk have?
app.get("/tedTalks/mostViewedTedTalk", (req, res) => {
  const mostViews = tedTalkData.reduce((a, b) => (a.views > b.views) ? a : b) .views
  
  if(mostViews) {
        res.status(200).json({
          success: true,
          message: "Copy number, an go to /tedTalks/mostViewed",
          body: {
            tedTalkData: mostViews
          }
        })
  }        
  // console.log(mostViews) 
 });

// Route 8 random TED Talk

app.get("/randomTedTalk", (req,res) => {
  const randomTedTalk = tedTalkData[Math.floor(Math.random()* tedTalkData.length)]
  
  if(randomTedTalk) {
    res.status(200).json({
      success: true,
      message: "Enjoy your random selected TED Talk",
      body: {
        tedTalkData: randomTedTalk
      }
    })
  } else {
    res.status(404).json({
      success: false, 
      message: "Enjoy your TED Talk",
      body: {}
  })
}
});



// Start the server, port = (const port = process.env.PORT || 8080;) 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

