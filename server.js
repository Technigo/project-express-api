import express from "express";
import cors from "cors";
import eventsData from "./data/events.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/events", (req, res) => {
  let filteredEvents = eventsData;

  const { city, category } = req.query;

  if (city) {
    filteredEvents = filteredEvents.filter(event => event.city.toLowerCase().includes(city.toLowerCase()));
  }

  if (category) {
    filteredEvents = filteredEvents.filter(event =>
      event.category.some(cat => cat.toLowerCase().includes(category.toLowerCase()))
    );
  }

  res.json(filteredEvents);
});


app.get("/events/:id", (req, res) => {
  const { id } = req.params;
  const event = eventsData.find(event => event.id === parseInt(id));

  if (event) {
    res.json(event);
  } else {
    res.status(404).send("Event not found");
  }
});

app.get("/", (req, res) => {
  res.send(`
    API Documentation:
    - GET /events - Get all events
    - GET /events/:id - Get a specific event by ID
    - Query Parameters:
      - category or city: Filter by category (e.g., 'music', 'art', etc.)
  `);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
