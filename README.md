# An Express API

This is my first backend project, which was a creating an API using Express. 
I'm using data from Netflix to return both json data and render web pages, using EJS template engine.

## The problem and approaches 
Since I'm not using a databases in this project, the data is stored and loaded from a local JSON file. The data is processed using the array methods <code>.find() </code><code>.filter() </code> and <code>.slice()</code>. 
The data is presented using EJS template uses pagination.

## Endpoint examples
### Returning web page (click links)
- All shows (GET) => https://api-express-by-nasim.herokuapp.com/shows?page=1&perPage=12
- TV-shows (GET) => https://api-express-by-nasim.herokuapp.com/tv-shows?page=1&perPage=12
- Movies (GET) => https://api-express-by-nasim.herokuapp.com/movies?page=1&perPage=12
- One movie/tv-show (GET) => https://api-express-by-nasim.herokuapp.com/show/id/70101696

### Returning JSON
Query using country and year, e.g <code>?country=france&year=2018</code>
- All shows (GET) => https://api-express-by-nasim.herokuapp.com/api/netflix?country=france&year=2018


## Technologies used 
- Node.js
- JavaScript ES6
- Express
- EJS (https://ejs.co)

## Deployed version 🎯

https://api-express-by-nasim.herokuapp.com


