# Express API Project

This project was an backend project were I created an API using Express. The API is organized using REST and the data behind the API is top 50 Spotify tracks. I created different API endpoints to filter, find, limit and order the items returned in the response, which are sent in JSON format.

Error handling: A common error 404 will be sent in the response if the id the user tried to find was not available.

Pagination: The database is made up of 50 different tracks, but the user will be able to query the page and amount of results to show in the response.

## The problem

I wanted to give the user the possiblity to sort the results by for example by popularity, energy or danceability, but was not sure how to implement it so that it works regardless what key the user gives in the browser. For example sort=popularity or sort=danceability. Now created only code for the popularity.

## View it live
