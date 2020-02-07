# An Express API

This is my first backend project, which is creating an API using Express. I'm using the Netflix data to make a couple of RESTful endpoints, which returns either an array of data, or a single item.

## The problem and approaches 
Since Im not using databases in this project, I needed to use a hard-coded set of data as a JSON file and it was such a large data. By using array methods such as <code>.find() </code>, <code>.filter() </code>, and <code>.slice()</code>, it does limit the items returning in the responses. 
I also used <% EJS %> Embedded JavaScript templating, to make sure the endpoints works well on the frontend. 

## RESTul endpoints

- API default - All shows => https://api-express-by-nasim.herokuapp.com/netflix?page=1&perPage=12
- All tv-shows => https://api-express-by-nasim.herokuapp.com/tv-shows?page=1&perPage=12
- All movies => https://api-express-by-nasim.herokuapp.com/movies?page=1&perPage=12
- Search query path  example => https://api-express-by-nasim.herokuapp.com/netflix/id/70101696

## Technologies used 

- JavaScript ES6
- Express
- EJS - Embedded JavaScript templating

## Deployed version 🎯

https://api-express-by-nasim.herokuapp.com/netflix?page=1&perPage=12


