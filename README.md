# Project Express API

This week we started with backend and our first project was to create an express API. This was done by using a json file that I got with help from chatGPT. Since I love cats I asked for 55 cat breeds including information on fur length, personality, commonality and more.

I started out by planning for which endpoints and routes to have and decided to have one filter query parameters and conditionals- if/else statements for all cats and filtered by personality, fur_length, or commonality. And then I wanted separate route parameters for breed and ID and used the find method for that. I also added error handling to all routes.

## The problem

I looked a lot at Matildas live session where she had different examples of query parameters or route parameters and filtering or find methods. I think it was very straight forward but I had one problem with the find method and route paths, there was a conflict between the routes for breed and ID so I needed to add more unique path to the cats breed. "/cats/breed/:breed" instead of "/cats/:breed" which worked.

## View it live

https://project-express-api-cats.onrender.com/
