Project built during Technigo Bootcamp

# Express API Project

The project was to build an API with some RESTful endpoints using Express.

## The problem

In my project I used the netflix-titles.json.

Endpoints:

'/titles'
Displays all items in the json, both movies and tv shows.

Possible to use the following queries:

?released - release year, YYYY
?name - movie/tv show title, no need to write entire title to show hits
?country - production country/ies, no need to write entire country to show hits
?category - category/genre, no need to write entire category to show hits
?rating - classifications/maturity ratings

---

'/titles/:id'
Id param to return a single movie/tv show

---

'/movies'
Displays all movies

---

'/tvshows'
Displays all tv shows

Possible to use query:

?seasons - number of seasons

---

'/movies/50_latest'
Displays the 50 latest released movies based on release year


## View it live

Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can click around and see what it's all about.
