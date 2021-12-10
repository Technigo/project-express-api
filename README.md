# Top Music Tracks - An Express REST API

This is my first API, made with node.js. I used the top 100 streamed songs of all time on Spotify. The source of the data was Kaggle.com, which in turn retrieved it from http://organizeyourmusic.playlistmachinery.com/.

## Features

- 7 different routes using the GET method.
- Endpoints that return a collection of results: Get all tracks, filter by genre, danceability or workout-friendly.
- Endpoints that return a single result: Get track by ID, by song title, or artist name. The last two use query parameters for that purpose.
- Error handling by returning 404 status codes when the item is not found.

## Production process

- I worked with a smaller dataset at first (only 50 songs). It was outdated, so I decided to search for a new one.
- The final dataset comes from the source provided above. I renamed the CSV columns to make them JSON-friendly and then converted the file to JSON via https://csvjson.com/.
- The first route was /tracks. First I console.logged the data and then implemented it as the API response.
- Then I proceeded to do the routes that return the collections, and finally the single results (including the ones with query params).
- I implemented a filter that simulates a rudimentary playlist mechanism. One of the routes displays tracks that are suitable for a party by filtering by the danceability parameter. The other route filters workout tracks through the energy parameter.

## Challenges and lessons learned

- I spent a while trying to make the /tracks route work. It turned out I was missing the slash at the beginning.
- I have yet to make error handling work when using query parameters. It only returns an empty array for now (instead of an http status like the other routes).
- In the future I might also add some pagination.
- I struggled finding a visual way to present the documentation for the endpoints. Might try implementing it on Swagger or on a frontend later.

## View it live

https://top-tracks-isabel-gonzalez.herokuapp.com/endpoints
