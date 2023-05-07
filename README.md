# Project Express API

The assignment was to set up an Express server and create my first API in Node using Express, create routes and deploy it on Google Cloud. I chose a dataset with 50 popular Spotify songs.

## The problem

Since this was my first time creating an API and setting up a server I ran into some new problems. I didn't get the Swagger documentation to fully work and I got to see how data can be influenced between endpoints. I decided last minute to hook it up to a frontend so there is a lot more that could be done there.

## View it live

Backend:
https://project-express-api-j2mriozkda-lz.a.run.app/

Frontend:
https://thunderous-piroshki-f66300.netlify.app/

## Documentation

//topMusicData is an API that allows the user to fetch data about a sample of 50 popular Spotify songs.
//
// */dataset
//shows the entire unfiltered data
//accept the following query params:
//id: fetches a single song with the specified id. Available id's are 1-50

// */ genres
//returns all genres
// accepts the following query params:
//genreName: returns all the songs in a specified genre

// */songlist
// returns all tracknames
// accepts the following query params:
// songname: returns all available data on a specific song

//*/songlist/sort
//accepts the following query params:
//sortBy: sorts the data on either danceability or popularity and returns a few specifics about each song.

// */songlist/top10
// accepts the following request params:
// 'bpm', 'energy', 'danceability', 'loudness', 'liveness', 'valence', 'length', 'acousticness', 'speechiness', 'popularity'
//Returns a list of the 10 songs that score highest in the requested category
