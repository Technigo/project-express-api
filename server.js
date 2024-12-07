import express from "express";
import cors from "cors";
import eventsData from "./data/events.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/events", (req, res) => {
  let filteredEvents = eventsData;

  const { category, location, city, age, date } = req.query;

  if (category) {
    filteredEvents = filteredEvents.filter(event => event.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (location) {
    filteredEvents = filteredEvents.filter(event => event.location.toLowerCase().includes(location.toLowerCase()));
  }

  if (city) {
    filteredEvents = filteredEvents.filter(event => event.city.toLowerCase().includes(city.toLowerCase()));
  }

  if (age) {
    filteredEvents = filteredEvents.filter(event => event.age === parseInt(age));
  }

  if (date) {
    filteredEvents = filteredEvents.filter(event => event.date === date);
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
      - category: Filter by category (e.g., 'music', 'kids', etc.)
      - location: Filter by location
      - city: Filter by city
      - age: Filter by age (e.g., '18' for events suitable for 18+)
      - date: Filter by date (e.g., '2025-05-10')
  `);
});

// Starta servern
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
