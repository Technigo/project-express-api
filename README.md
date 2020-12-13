# Express API Project

This project's goal is to create a first RESTful API using Node in Express. The API should have a series of endpoints which return an array of data or a single object. I worked with a hardcoded dataset in JSON format with a list of Netflix items that countained both movies and tv shows plus their details

## How I built it - What I learned

I managed to implement different endpoints showing results filtered by Movies, Tv-shows,  single netflixitem by ID and filter by release year.
I learned how to use express-list-endpoints to list endpoints and use APIDocs to generate documentation regarding the endpoints.
I wanted to push myself some more and decided to implement Pagination to my API since the dataset is so big, it's easier to manipulate the data in smaller chunks. 
Also learned how to respond with 404 Error messages when a request yields no results. 


## View it live

My Netflix API is live in Heroku, you can find it here: https://technigo-netflix.herokuapp.com/
Documenation can be found here : https://github.com/MayaBlixt/project-express-api/blob/master/src/doc/index.html
