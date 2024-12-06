# Project Express API

This project is an introduction to backend development using Express. The main goal is to create a RESTful API with at least a few endpoints that return data from a hardcoded JSON dataset. These endpoints can return either collections or individual items based on client requests.

## The problem

The challenge was to design and implement a functional API that adheres to RESTful principles. To achieve this, I planned the structure of the API by identifying potential endpoints and designing their responses based on user requirements. I used Node.js, Express, and array methods like `.find()`, `.filter()`, and `.sort()` to manipulate the JSON data effectively.

I also added optional query parameters for filtering and sorting the dataset, making the API more dynamic and useful. If I had more time, I would consider adding:

- Pagination for large datasets.
- A frontend to visualize and interact with the API.
- A connection to a database for persistent data storage.

## View it live

Render: https://project-express-api-ek.onrender.com

## Features and Routes

`GET /`
Returns API documentation, listing all available endpoints.

`GET /videogames`
Returns all videogames or allows filtering by category (e.g., `?category=racing`) or release year (e.g., `?year=2020`).

`GET /videogames/:id`
Returns details of a single videogame based on its unique ID.

`GET /videogames/sorted/ratings`
Returns all videogames sorted by their rating, from highest to lowest.