# Express API Project - Netflix Data

This project is built with Node.js and Express to practice making a REST-API, by using a json with data from Netflix.


## The problem

I started by setting up the dependencies and enabling the json-file that I wanted to use. I ran the path in Postman to see how the data looked. I then decided to starting with creating an endpoint that would show all the data, in this case all the Netflix movies and TV-shows from the json. After that I sat up endpoints that filtered the two different types of shows, “Movie” and “TV-show”. I also sat up two endpoints so the user can use parameters to look for a specific title or an id. I then decided to add filters for the endpoints that shows a list of objects, so the user can search for specific items like a title or director by adding query strings. Finally I added status codes for when the filtered array ends up empty (no query result) and when the params are not matching any objects. I also went back once to change the logic for the filters because I found a cleaner solution that also allowed you to add more than one query, which did not work with my first solution. I also added a starting endpoint (by using express-list-endpoints) that lists all the different endpoints available. Lastly I deployed the project on Heroku. 

I didn't have any blockers with this project, and if I got stuck somewhere I easily found a solution on StackOverflow, but I managed to figure out most of it by myself. If I had more time I would like to add some frontend to use the data, and probably more filters to make it searchable.

**The available endpoints are:**

/ - *lists all the endpoints*

/shows – *show all the data (all the shows, available filters for title, cast, director, country)*

/movies – *show only movies (available filters for title, cast, director, country)*

/tv-shows – *show only TV-shows (available filters for title, cast, director, country)*

/shows/id/:id – *able to add an id to look for a specific show*

/shows/title/:title – *able to add a title too look for a specific show*


## View it live

See the deployed project here: 
