# Project Express API

We had to create an API using Express. The API had to have at least a couple of RESTful endpoints that returned both an array of data and a single item. I used data from Netflix and created six routes in total: one for all titles, one for a specific ID, three queries to allow searches by type (movie or tv show, for example), year and country, and one empty/dummy post request. 

## The problem

I began by checking out the data sets and figuring out which data set to use, and which endpoints and routes I wanted to create. After watching the codealong I managed to create the routes quite quickly. I then worked on accepting filters via query parameters to filter the data I returned from endpoints and handling when a single item didn’t exist by returning a message to the user. I also tried to create an empty endpoint for a ‘post’ request, and started trying to implement Swagger to document my endpoints. After this, I re-watched the live sessions and realised I needed to assign the data to a new name if I wanted to keep the original array intact each time I made a new API request. So I re-wrote the endpoints to make sure this happened, and used Postman to check all my routes worked. Due to the time this took, I didn’t manage to finish implementing Swagger but I might come back to it in the future. 

## View it live

https://fiona-klacar-project-express-api.onrender.com
